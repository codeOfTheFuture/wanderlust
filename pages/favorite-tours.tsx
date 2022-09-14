import React from "react";
import { GetServerSideProps, NextPage } from "next";
import PageHeading from "../components/ui/PageHeading";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Layout from "../components/layouts/Layout";
import { wrapper } from "../store";
import { selectUser, setUser } from "../slices/userSlice";
import { User } from "../types/typings";
import { useSelector } from "react-redux";

const FavoriteTours: NextPage = () => {
  const user = useSelector(selectUser);

  return (
    <Layout>
      <PageHeading headingText="here are your favorite tours" />

      <section className="w-full h-[40vh] flex justify-center items-center">
        {!user?.favorite_tours?.length && (
          <h2 className="text-lg font-medium">
            You don&apos;t have any favorite tours.
          </h2>
        )}
      </section>
    </Layout>
  );
};

export default FavoriteTours;

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
