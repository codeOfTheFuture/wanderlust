import React from "react";
import Layout from "../components/Layouts/Layout";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Button from "../components/Button";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { User } from "../types/typings";
import PageHeading from "../components/PageHeading";

interface Props {
  user: User | null;
}

const OfferedTours: NextPage<Props> = ({ user }) => {
  return (
    <Layout user={user}>
      <PageHeading
        user={user}
        headingText="Here you can add, edit, and delete your offered tours."
      />

      <section className="flex flex-col justify-center items-center gap-5 h-2/5">
        <h2>
          {!user?.guide
            ? "Please register as a guide in your settings if you would like to create a tour"
            : !user.offered_tours?.length &&
              "You currently have no offered tours"}
        </h2>

        {!user?.guide ? (
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
      </section>
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
      user: session?.user ? session.user : null,
    },
  };
};
