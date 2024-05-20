import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

const authConfig:any = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      try {
        const existingGuest = await getGuest(user.email as string);
        if (!existingGuest) {
          await createGuest({
            email: user.email as string,
            fullName: user.name as string,
          });
        }
        return true;
      } catch (error) {
        return false;
      }
    },
    async session({ session }) {
      const guest = await getGuest(session.user?.email as string);
      if (guest) {
        session.user.guestId = guest.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

export default NextAuth(authConfig);
