import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Layout from "../components/layouts/Layout";
import SearchInput from "../components/ui/SearchInput";
import TourCardWrapper from "../components/tour-cards/TourCardWrapper";
import { connectToDatabase } from "../lib/mongodb";
import { User, Tour } from "../types/typings";
import Button from "../components/ui/Button";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { wrapper } from "../store";
import { setUser } from "../store/slices/userSlice";

interface Props {
  tours: Tour[];
}

const Home: NextPage<Props> = props => {
  const { tours } = props;

  return (
    <Layout>
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

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async context => {
    // Get current session
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

    session && store.dispatch(setUser(session.user as User));

    // Connect to MongoDb
    const { db } = await connectToDatabase();

    const queryTours = await db.collection("tours").find({}).toArray(),
      tours = JSON.parse(JSON.stringify(queryTours));

    return {
      props: {
        tours,
      },
    };
  });
