import React from "react";
import { GetServerSideProps, NextPage } from "next";
import SettingsForm from "../components/SettingsForm/SettingsForm";
import Layout from "../components/Layouts/Layout";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { User } from "../types/typings";

interface Props {
  user: User | null;
}

const Settings: NextPage<Props> = props => {
  const { user } = props;

  return (
    <Layout user={user}>
      <div className="relative flex justify-center items-center w-full h-[92vh] bg-settings-blurred bg-cover lg:bg-center lg:bg-no-repeat ">
        <div className="absolute w-full h-full bg-black opacity-30"></div>
        <SettingsForm />
      </div>
    </Layout>
  );
};

export default Settings;

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
