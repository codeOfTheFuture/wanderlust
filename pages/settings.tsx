import React from "react";
import { GetServerSideProps, NextPage } from "next";
import SettingsForm from "../components/settings-form/SettingsForm";
import Layout from "../components/layouts/Layout";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { User } from "../types/typings";
import { wrapper } from "../store";
import { setUser } from "../slices/userSlice";

const Settings: NextPage = () => {
  return (
    <Layout>
      <div className="relative flex justify-center items-center w-full h-[92vh] bg-settings-blurred bg-cover lg:bg-center lg:bg-no-repeat ">
        <div className="absolute w-full h-full bg-black opacity-30"></div>
        <SettingsForm />
      </div>
    </Layout>
  );
};

export default Settings;

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
