"use server";
import { revalidatePath } from "next/cache";
import { auth, signIn, signOut } from "./auth";
import { supabase } from "./supabase";
import { createBooking, deleteBooking, getBooking, getBookings } from "./data-service";
import { redirect } from "next/navigation";
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}
function isValidNationalId(nationalId: string) {
  const nationalIdRegex = /^[a-zA-Z0-9]{6,12}$/;
  return nationalIdRegex.test(nationalId);
}
export async function UpdateProfileAction(formData: any) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in ");
  const nationalID = formData.get("nationalID");
  const [nationality, countryFlag] = formData.get("nationality").split("%");
  if (!isValidNationalId(nationalID)) throw new Error("Provide a valid national id ");
  const updateData = { nationality, countryFlag, nationalID };
  //@ts-ignore
  const { data, error } = await supabase.from("guests").update(updateData).eq("id", session?.user?.guestId);
  console.log(data, updateData);
  if (error) throw new Error("could not update");
  revalidatePath("/account");
}

export async function deleteReservation(bookingId: string) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in ");
  //@ts-ignore
  const guestBookings = await getBookings(session?.user?.guestId);
  const guestBookingIDs = await guestBookings.map((b) => b.id);
  if (!guestBookingIDs.includes(bookingId)) throw new Error("you are not allowed to delete the booking ");
  await deleteBooking(bookingId);
  revalidatePath("/account/reservations");
}

export async function createReservation(bookingData: any, formData: any) {
  console.log(bookingData);
  const session = await auth();
  if (!session) throw new Error("You must be logged in ");
  const newBooking = {
    ...bookingData,
    //@ts-ignore
    guestId: session?.user?.guestId,
    numGuests: +formData.get("numGuests"),
    observations: formData.get("observations").slice(0,1000),
    extrasPrice:0,totalPrice:bookingData.cabinPrice,
    isPaid:false,hasBreakfast:false,status:'unconfirmed'
  };
  console.log(newBooking)
  await createBooking(newBooking)
  revalidatePath(`/cabins/${bookingData.cabinId}`)
  redirect('/thank-u')
}
