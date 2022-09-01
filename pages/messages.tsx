import React from "react";
import { GetServerSideProps, NextPage } from "next";
import Layout from "../components/Layouts/Layout";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { User } from "../types/typings";
import Message from "../components/Messages/Message";
import PageHeading from "../components/PageHeading";

interface Props {
  user: User | null;
}

const Messages: NextPage<Props> = props => {
  const { user } = props;
  return (
    <Layout user={user}>
      <PageHeading user={user} headingText="Here are your messages." />

      <section className="w-full flex flex-col items-center gap-5 my-10">
        <Message userImg={user!.image!} />
        <Message userImg={user!.image!} />
      </section>
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
