import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";
const authConfig = {
  providers: [Google({ clientId: process.env.GOOGLE_ID, clientSecret: process.env.GOOGLE_SECRET })],
  callbacks: {
    //@ts-ignore
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    //@ts-ignore
    async signIn({ user, account, profile }) {
      try {
        const exisitingGuest = await getGuest(user.email);
        if (!exisitingGuest) await createGuest({ email: user.email, fullName: user.name });
        return true;
      } catch (error) {
        return false;
      }
    },
    //@ts-ignore
    async session({ session, user }) {
      const guest = await getGuest(session.user.email);
      session.user.guestId = guest.id;
      return session;
    },
  },
  pages: { signIn: "/login" },
};
export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
  //@ts-ignore
} = NextAuth(authConfig);
