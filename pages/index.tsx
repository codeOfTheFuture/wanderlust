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
        <div className="flex justify-start items-center h-[100vh] w-full">
          <div className="flex flex-col justify-center mt-32 ml-32 z-10">
            <h1 className="text-8xl font-semibold text-white">Zion National Park</h1>
            <button className="w-40 h-14 bg-[#4285F4] rounded-lg text-lg text-white">View Tours</button>
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
