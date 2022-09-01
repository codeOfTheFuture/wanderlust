import React from "react";
import { GetServerSideProps, NextPage } from "next";
import Layout from "../components/Layouts/Layout";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { User } from "../types/typings";
import Message from "../components/Messages/Message";

interface Props {
  user: User | null;
}

const Messages: NextPage<Props> = props => {
  const { user } = props;
  return (
    <Layout user={user}>
      <div className="h-screen">
        <div className="relative bg-running-in-forest bg-cover bg-center bg-no-repeat flex items-end h-3/5">
          <div className="absolute w-full h-full bg-black opacity-50"></div>
          <h1 className="absolute ml-20 mb-20 text-light-text text-6xl font-semibold">
            Hi {user?.name.split(" ")[0]},
            <br />
            Here are your messages.
          </h1>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col gap-5 my-10">
          <Message userImg={user!.image!} />
          <Message userImg={user!.image!} />
        </div>
      </div>
    </Layout>
  );
};

export default Messages;

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  return {
    props: {
      user: session?.user ? session.user : null,
    },
  };
};
