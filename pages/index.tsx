import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Layout from "../components/Layouts/Layout";
import SearchInput from "../components/UI/SearchInput";
import TourCardWrapper from "../components/TourCards/TourCardWrapper";
import { connectToDatabase } from "../lib/mongodb";
import { User, Tour } from "../types/typings";
import Button from "../components/UI/Button";
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
      <div className="absolute top-0 left-0 bg-mountain-jump bg-no-repeat bg-cover bg-top h-[60vh] w-full"></div>

      <div className="absolute top-0 left-0 bg-black opacity-70 h-[60vh] w-full"></div>

      <div className="relative flex flex-col justify-center md:justify-center items-center w-full sm:w-5/6 lg:w-3/4 mx-auto h-[60vh] z-10">
        <div className="flex flex-col items-start w-full justify-center pl-5 md:pl-0">
          <h1 className="text-4xl md:text-6xl  xl:text-8xl font-semibold text-light-text mt-52 sm:mt-44">
            Zion National Park
          </h1>
          <Button color="btn-primary" size="btn-lg" type="button">
            View Map
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
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const { db } = await connectToDatabase();
  const tours = await db.collection("tours").find({}).toArray();

  return {
    props: {
      user: session?.user ? session.user : null,
      tours: JSON.parse(JSON.stringify(tours)),
    },
  };
};
