import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";
import SearchInput from "../components/SearchInput";
import Tours from "../components/Tours";
import { Tour } from "../types/types";

interface Props {
  tours: Tour[];
}

const Home: NextPage<Props> = ({ tours }) => {
  return (
    <div className="font-poppins">
      <Head>
        <title>Wanderlust</title>
      </Head>

      <Layout>

        <div className="relative flex flex-col justify-center md:justify-center items-center w-full h-[80vh] z-10">
          <div className="flex flex-col w-full items-start justify-center pl-5 md:pl-0">
            <h1 className="text-4xl md:text-6xl  xl:text-8xl font-semibold text-white mt-52 sm:mt-44">Zion National Park</h1>
            <button className="w-40 h-14 bg-[#4285F4] text-lg text-white mt-5">View Map</button>
          </div>
          <SearchInput />
        </div>

        <Tours tours={tours} />
      </Layout>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const res = await fetch('http://localhost:3000/api/tours');
  const tours = await res.json();

  return {
    props: {
      tours
    },
  }
}
