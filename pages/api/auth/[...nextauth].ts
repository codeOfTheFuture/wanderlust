import NextAuth, { NextAuthOptions } from "next-auth";
import { connectToDatabase } from "../../../lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";
import { User } from "../../../types/typings";

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
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID!,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_APP_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_APP_ID!,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_APP_SECRET!,
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

  secret: process.env.NEXT_PUBLIC_AUTH_SECRET!,
};

export default NextAuth(authOptions);
