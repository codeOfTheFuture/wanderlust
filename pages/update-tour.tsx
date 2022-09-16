import React from "react";
import Layout from "../components/layouts/Layout";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import TourForm from "../components/tour-form/TourForm";
import { wrapper } from "../store";

const UpdateTour: NextPage = () => {
  return (
    <Layout>
      <TourForm />
    </Layout>
  );
};

export default UpdateTour;

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
