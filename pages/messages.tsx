import React from "react";
import { GetServerSideProps, NextPage } from "next";
import Layout from "../components/layouts/Layout";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { User } from "../types/typings";
import Message from "../components/messages/Message";
import PageHeading from "../components/ui/PageHeading";
import { selectUser, setUser } from "../slices/userSlice";
import { wrapper } from "../store";
import { useSelector } from "react-redux";

const Messages: NextPage = () => {
  const user = useSelector(selectUser);

  return (
    <Layout>
      <PageHeading headingText="Here are your messages." />

      <section className="w-full flex flex-col items-center gap-5 my-10">
        <Message userImg={user!.image!} />
        <Message userImg={user!.image!} />
      </section>
    </Layout>
  );
};

export default Messages;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async context => {
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

    session && store.dispatch(setUser(session.user as User));

    return {
      props: {},
    };
  });
