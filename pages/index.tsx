import type { NextPage } from "next";
import Head from "next/head";
import Layout from "../components/Layout";

const Home: NextPage = () => {
  return (
    <div className="font-poppins">
      <Head>
        <title>Wanderlust</title>
      </Head>

      <Layout>
        <div className="flex justify-start items-center h-full w-full">
          <h1 className="text-8xl font-semibold text-white">Zion National Park</h1>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
