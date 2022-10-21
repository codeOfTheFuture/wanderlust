import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import TourForm from "../components/tour-form/TourForm";
import { wrapper } from "../store";
import { setUser } from "../store/slices/userSlice";
import { SessionUser, Tour, User } from "../types/typings";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../lib/mongodb";

const CreateTour: NextPage = () => {
  const submitForm = async (newTour: Tour) => {
    const response = await fetch("/api/tours", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTour),
    });

    const addedTour = response.json();

    console.log("added tour>>>>>", addedTour);
  };

  return (
    <>
      <TourForm submitForm={submitForm} />
    </>
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
      const { id } = session.user as SessionUser;

      const user = (await db
        .collection("users")
        .findOne({ _id: new ObjectId(id) })) as User;

      store.dispatch(setUser(JSON.parse(JSON.stringify(user))));
    }

    return {
      props: {},
    };
  });
