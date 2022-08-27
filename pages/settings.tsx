import React from "react";
import { NextPage } from "next";
import SettingsForm from "../components/SettingsForm/SettingsForm";
import Layout from "../components/Layouts/Layout";

const Settings: NextPage = () => {
  return (
    <Layout>
      <div className="flex justify-center items-center w-full h-screen bg-settings-blurred bg-cover lg:bg-center lg:bg-no-repeat relative">
        <div className="absolute w-full h-full bg-black opacity-30"></div>
        <SettingsForm />
      </div>
    </Layout>
  );
};

export default Settings;
