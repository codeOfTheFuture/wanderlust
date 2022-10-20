import NextAuth, { NextAuthOptions } from "next-auth";
import { connectToDatabase } from "../../../lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  adapter: MongoDBAdapter(
    (async () => {
      const { client } = await connectToDatabase();
      return client;
    })(),
    {}
  ),
  providers: [
    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_APP_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_APP_ID as string,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_APP_SECRET as string,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
    newUser: "/auth/signup",
  },

  callbacks: {
    async signIn({ user }) {
      if (user.signedInBefore == null) {
        user.streetAddress = null;
        user.city = null;
        user.state = null;
        user.zipCode = null;
        user.phoneNumber = null;
        user.registerAsGuide = false;
        user.offeredTours = [];
        user.favoriteTours = [];
        user.messages = [];
        user.signedInBefore = true;
      }
      return true;
    },
    async session({ session, user }) {
      session.user = user;
      return session;
    },
  },

  secret: process.env.NEXT_PUBLIC_AUTH_SECRET as string,
};

export default NextAuth(authOptions);
