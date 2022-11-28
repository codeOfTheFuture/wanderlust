import { Fragment } from "react";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import TourForm from "../components/Tour-form/TourForm";
import { wrapper } from "../store";
import { setUser } from "../store/slices/userSlice";
import { Tour } from "../types/typings";

import { connectToDatabase } from "../lib/mongodb";

const CreateTour: NextPage = () => {
  const submitForm = async (newTour: Tour) => {
    await fetch("/api/tours", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTour),
    });
  };

  return (
    <Fragment>
      <TourForm submitForm={submitForm} />
    </Fragment>
  );
};

export default CreateTour;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async context => {
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

    // Connect to MongoDb
    const { db } = await connectToDatabase();

    // Only runs if session exists and user in redux is null
    if (session && store.getState().user.user == null) {
      const user = await db
        .collection("users")
        .findOne({ email: session.user?.email });

      store.dispatch(setUser(JSON.parse(JSON.stringify(user))));
    }

    return {
      props: {},
    };
  });
