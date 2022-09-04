import React from "react";
import Layout from "../components/layouts/Layout";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { User } from "../types/typings";
import TourForm from "../components/tour-form/TourForm";
import Modal from "../components/modal/Modal";

interface Props {
  user: User | null;
}

const CreateTour: NextPage<Props> = props => {
  const { user } = props;

  console.log("User: ", user);

  return (
    <Layout user={user}>
      <TourForm user={user} />
      <Modal />
    </Layout>
  );
};

export default CreateTour;

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
