import type { NextPage } from "next";
import Head from "next/head";
import { User } from "../types/types";

interface Props {
  users: User[];
}

const Home: NextPage<Props> = () => {
  return (
    <div className="font-poppins">
      <Head>
        <title>Wanderlust</title>
      </Head>

      <h1>Wanderlust</h1>
    </div>
  );
};

export default Home;
