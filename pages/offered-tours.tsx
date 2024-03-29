import { Fragment } from "react";
import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Button from "../components/ui/Button";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import PageHeading from "../components/ui/PageHeading";
import { useAppSelector, wrapper } from "../store";
import { selectUser, setUser } from "../store/slices/userSlice";
import { Tour, TourResults, User } from "../types/typings";
import { connectToDatabase } from "../lib/mongodb";
import TourCards from "../components/tour-cards/TourCards";
import { ObjectId } from "mongodb";
import { selectTours, setTours } from "../store/slices/toursSlice";

const OfferedTours: NextPage = () => {
  const { registerAsGuide } = useAppSelector(selectUser) as User;
  const tourResults = useAppSelector(selectTours);

  return (
    <Fragment>
      <PageHeading headingText="Here you can add, edit, and delete your offered tours." />

      <section className="flex flex-col justify-center items-center gap-10 w-full sm:w-5/6 lg:w-3/4 min-h-[33vh] mx-auto my-20">
        {!registerAsGuide || tourResults?.results?.length === 0 ? (
          <h2 className="text-base md:text-xl font-medium">
            {!registerAsGuide
              ? "Please register as a guide in your settings if you would like to create a tour"
              : "You currently have no offered tours"}
          </h2>
        ) : null}

        {tourResults?.results && <TourCards loading={false} />}

        <Link href={!registerAsGuide ? "/settings" : "/create-tour"}>
          <Button color="btn-primary" size="btn-lg" type="button">
            {!registerAsGuide ? "Go to settings" : "Create Tour"}
          </Button>
        </Link>
      </section>
    </Fragment>
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

    const { db } = await connectToDatabase();

    // Only runs if session exists and user in redux is null
    if (session && store.getState().user.user == null) {
      const user = await db
        .collection("users")
        .findOne({ email: session.user?.email });

      store.dispatch(setUser(JSON.parse(JSON.stringify(user))));

      const queryOfferedTours = await db
        .collection("tours")
        .find({
          guideId: new ObjectId(user?._id),
        })
        .limit(8)
        .toArray();
      const offeredTours = (await JSON.parse(
        JSON.stringify(queryOfferedTours)
      )) as Tour[];

      const page = 1;
      const limit = store.getState().tours.tourResults.limit;

      const documentCount = offeredTours.length;
      const results = {} as TourResults;
      results.results = offeredTours;
      results.totalPages = Math.ceil(documentCount / limit);
      results.limit = limit;

      if (results.totalPages > 1)
        results.next = {
          page: page + 1,
        };

      store.dispatch(setTours(results));
    }

    return {
      props: {},
    };
  });
