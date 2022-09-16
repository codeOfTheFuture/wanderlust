import React from "react";
import { GetServerSideProps, NextPage } from "next";
import PageHeading from "../components/ui/PageHeading";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Layout from "../components/layouts/Layout";
import { wrapper } from "../store";
import { selectUser } from "../slices/userSlice";
import { useSelector } from "react-redux";

const BookedTours: NextPage = () => {
  const user = useSelector(selectUser);

  return (
    <Layout>
      <PageHeading headingText="here are the the tours you've booked." />

      <section className="w-full h-[40vh] flex justify-center items-center">
        {!user?.booked_tours?.length && (
          <h2 className="text-lg font-medium">
            You currently don&apos;t have any tours booked
          </h2>
        )}
      </section>
    </Layout>
  );
};

export default BookedTours;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async context => {
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

    return {
      props: {},
    };
  });
