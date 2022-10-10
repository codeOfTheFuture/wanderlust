import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import TourForm from "../components/tour-form/TourForm";
import { wrapper } from "../store";
import { setUser } from "../store/slices/userSlice";
import { User } from "../types/typings";

const CreateTour: NextPage = () => {
  return (
    <>
      <TourForm />
    </>
  );
};

export default CreateTour;

// export const getServerSideProps: GetServerSideProps =
//   wrapper.getServerSideProps(store => async context => {
//     const session = await unstable_getServerSession(
//       context.req,
//       context.res,
//       authOptions
//     );

//     session && store.dispatch(setUser(session.user as User));

//     return {
//       props: {},
//     };
//   });
