import NextAuth from "next-auth";
import connectMongo from "../../../utils/connectMongo";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import FacebookProvider from "next-auth/providers/facebook";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  // adapter: MongoDBAdapter(),
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

  secret: process.env.NEXT_PUBLIC_AUTH_SECRET as string,
});
