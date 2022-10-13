import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import TourForm from "../components/tour-form/TourForm";
import { wrapper } from "../store";
import { setUser } from "../store/slices/userSlice";
import { Tour, User } from "../types/typings";

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

    console.log("user>>>>>>>", session?.user);

    session && store.dispatch(setUser(session.user as User));

    return {
      props: {},
    };
  });
