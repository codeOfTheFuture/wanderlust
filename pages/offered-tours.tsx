import React from "react";
import Layout from "../components/Layouts/Layout";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Button from "../components/Button";
import { useSession } from "next-auth/react";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { User } from "../types/typings";

interface Props {
  user: User;
}

const OfferedTours: NextPage<Props> = props => {
  const { user } = props;
  console.log(user);

  return (
    <Layout>
      <div className="h-screen">
        <div className="relative bg-running-in-forest bg-cover bg-center bg-no-repeat flex items-end h-3/5">
          <div className="absolute w-full h-full bg-black opacity-50"></div>
          <h1 className="absolute ml-20 mb-20 text-light-text text-6xl font-semibold">
            Hi {user.name.split(" ")[0]},
            <br />
            Here you can add, edit, and delete your offered tours.
          </h1>
        </div>

        <div className="flex flex-col justify-center items-center gap-5 h-2/5">
          <h2>
            {!user.guide
              ? "Please register as a guide in your settings if you would like to create a tour"
              : !user.offered_tours?.length &&
              "You currently have no offered tours"}
          </h2>

          {!user.guide ? (
            <Link href="/settings">
              <Button color="btn-primary" size="btn-lg" type="button">
                Settings
              </Button>
            </Link>
          ) : (
            <Link href="/create-tour">
              <Button color="btn-primary" size="btn-lg" type="button">
                Create Tour
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default OfferedTours;

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  return {
    props: {
      user: session?.user,
    },
  };
};
