import { Fragment } from "react";
import { GetServerSideProps, NextPage } from "next";
import PageHeading from "../components/ui/PageHeading";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useAppSelector, wrapper } from "../store";
import { selectUser, setUser } from "../store/slices/userSlice";
import { TourResults, User } from "../types/typings";
import TourCards from "../components/tour-cards/TourCards";
import { connectToDatabase } from "../lib/mongodb";
import { setTours } from "../store/slices/toursSlice";

const BookedTours: NextPage = () => {
  const { bookedTours } = useAppSelector(selectUser) as User;

  return (
    <Fragment>
      <PageHeading headingText="here are the the tours you've booked." />

      <section className="flex flex-col justify-center items-center gap-10 w-full sm:w-5/6 lg:w-3/4 min-h-[33vh] mx-auto my-20">
        {!bookedTours?.length ? (
          <h2 className="text-lg font-medium">
            You currently don&apos;t have any tours booked
          </h2>
        ) : (
          <TourCards loading={false} />
        )}
      </section>
    </Fragment>
  );
};

export default BookedTours;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async context => {
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

    const { db } = await connectToDatabase();

    if (session && store.getState().user.user == null) {
      const userQuery = await db
          .collection("users")
          .findOne({ email: session.user?.email }),
        user = JSON.parse(JSON.stringify(userQuery)) as User;

      store.dispatch(setUser(user));

      const results = {} as TourResults;
      results.results = user.bookedTours;

      store.dispatch(setTours(results));
    }

    return {
      props: {},
    };
  });
