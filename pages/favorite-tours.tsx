import React from "react";
import { GetServerSideProps, NextPage } from "next";
import PageHeading from "../components/ui/PageHeading";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { User } from "../types/typings";
import Layout from "../components/layouts/Layout";

interface Props {
  user: User;
}

const FavoriteTours: NextPage<Props> = ({ user }) => {
  return (
    <Layout user={user}>
      <PageHeading user={user} headingText="here are your favorite tours" />

      <section className="w-full h-[40vh] flex justify-center items-center">
        {!user.favorite_tours?.length && (
          <h2 className="text-lg font-medium">
            You currently don&apos;t have any favorite tours.
          </h2>
        )}
      </section>
    </Layout>
  );
};

export default FavoriteTours;

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
