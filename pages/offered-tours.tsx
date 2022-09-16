import React from "react";
import Layout from "../components/layouts/Layout";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Button from "../components/ui/Button";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import PageHeading from "../components/ui/PageHeading";
import { wrapper } from "../store";
import { selectUser } from "../slices/userSlice";
import { useSelector } from "react-redux";

const OfferedTours: NextPage = () => {
  const user = useSelector(selectUser);

  return (
    <Layout>
      <PageHeading headingText="Here you can add, edit, and delete your offered tours." />

      <section className="flex flex-col justify-center items-center gap-5 h-[40vh]">
        <h2 className="text-xl font-medium">
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

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async context => {
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

    return {
      props: {},
    };
  });
