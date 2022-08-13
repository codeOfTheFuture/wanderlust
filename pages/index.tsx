import React from "react";
import type { GetServerSideProps, NextPage } from "next";
import Layout from "../components/Layouts/Layout";
import SearchInput from "../components/SearchInput";
import TourCardWrapper from "../components/TourCards/TourCardWrapper";
import { connectToDatabase } from "../lib/mongodb";
import { Tour } from "../types/typings";
import Button from "../components/Button";

interface Props {
  tours: Tour[];
}

const Home: NextPage<Props> = ({ tours }) => {

  return (
    <Layout>
      <div className="absolute top-0 left-0 bg-mountain-jump bg-no-repeat bg-cover bg-bottom h-[80vh] w-full"></div>

      <div className="absolute top-0 left-0 bg-black opacity-60 h-[80vh] w-full"></div>

      <div className="relative flex flex-col justify-center md:justify-center items-center w-full sm:w-5/6 lg:w-3/4 mx-auto h-[80vh] z-10">
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

export const getServerSideProps: GetServerSideProps = async () => {
  const { db } = await connectToDatabase();

  const tours = await db.collection("tours").find({}).toArray();

  return {
    props: {
      tours: JSON.parse(JSON.stringify(tours)),
    },
  } as { props: { tours: Tour[] } };
};
