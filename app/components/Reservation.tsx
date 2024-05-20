import { auth } from "../lib/auth";
import { getBookedDatesByCabinId, getSettings } from "../lib/data-service";
import { CabinsProps } from "../types";
import DateSelector from "./DateSelector";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

const Reservation = async ({ cabin }: { cabin: CabinsProps }) => {
  const [bookedDates, settings] = await Promise.all([getBookedDatesByCabinId(cabin.id.toString()), getSettings()]);
  const session = await auth();
  return (
    <div className=" grid grid-cols-2 border-primary-800 min-h-[400px]">
      <DateSelector settings={settings} cabin={cabin} bookedDated={bookedDates} />
      {session?.user?<ReservationForm user={session.user} settings={settings} />:<LoginMessage/>}
    </div>
  );
};

export default Reservation;
