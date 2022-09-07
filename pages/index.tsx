import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Layout from "../components/layouts/Layout";
import SearchInput from "../components/ui/SearchInput";
import TourCardWrapper from "../components/tour-cards/TourCardWrapper";
import { connectToDatabase } from "../lib/mongodb";
import { User, Tour } from "../types/typings";
import Button from "../components/ui/Button";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

interface Props {
  user: User | null;
  tours: Tour[];
}

const Home: NextPage<Props> = props => {
  const { user, tours } = props;

  return (
    <Layout user={user}>
      <div className="absolute top-0 left-0 bg-mountain-jump bg-no-repeat bg-cover bg-top h-[70vh] w-full"></div>

      <div className="absolute top-0 left-0 bg-black opacity-70 h-[70vh] w-full"></div>

      <div className="relative flex flex-col justify-center md:justify-center items-center w-full sm:w-5/6 lg:w-3/4 mx-auto h-[70vh] z-10">
        <div className="flex flex-col items-start w-full justify-center gap-2 pl-5 md:pl-0">
          <h1 className="text-4xl md:text-6xl  xl:text-8xl font-semibold text-light-text mt-52 sm:mt-44">
            Zion National Park
          </h1>
          <Button color="btn-primary" size="btn-lg" type="button">
            Search Map
          </Button>
        </div>
        <SearchInput />
      </div>

      <TourCardWrapper tours={tours} />
    </Layout>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async context => {
  // Get current session
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  // Connect to MongoDb
  const { db } = await connectToDatabase();

  // // Query user by email
  // const queryUser = await db.collection("users").findOne({
  //   email: session?.user?.email,
  // });

  // let user;

  // console.log("Query User >>>>>", queryUser);

  // // Check to see if user exists in db and it is their first time signing in.
  // if (queryUser?.signedInBefore === null) {
  //   console.log("It works!!!!!!");
  //   user = await db.collection("users").findOneAndUpdate(
  //     { _id: queryUser._id },
  //     {
  //       $set: {
  //         address: null,
  //         city: null,
  //         state: null,
  //         zip_code: null,
  //         phone_number: null,
  //         guide: false,
  //         offered_tours: [],
  //         favorite_tours: [],
  //         messages: [],
  //         signedInBefore: true,
  //       },
  //     },
  //     { returnDocument: "after" }
  //   );
  // }

  // if (queryUser?.signedInBefore === true) {
  //   user = session?.user;
  // }

  const queryTours = await db.collection("tours").find({}).toArray(),
    tours = JSON.parse(JSON.stringify(queryTours));

  return {
    props: {
      user: session?.user || null,
      tours,
    },
  };
};
