import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { ObjectId } from "mongodb";
import Layout from "../components/layouts/Layout";
import RecommendedTours from "../components/tour-cards/RecommendedTours";
import TourDetails from "../components/tour-page/TourDetails";
import TourPageHeader from "../components/tour-page/TourPageHeader";
import { connectToDatabase } from "../lib/mongodb";
import { Tour, User } from "../types/typings";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";

interface Props {
  user: User | null;
  tours: Tour[];
  tour: Tour;
  guide: User;
}

const Tour: NextPage<Props> = props => {
  const { user, tour, guide, tours } = props,
    { title, tour_photos } = tour;

  return (
    <Layout user={user}>
      <div className="flex flex-col justify-center items-center gap-5">
        <TourPageHeader backgroundImage={tour_photos[0]} title={title} />
        <TourDetails tour={tour} guide={guide} />
        <div className="w-11/12 xl:w-1/2 h-[1px] mx-auto bg-black"></div>
        <RecommendedTours tours={tours} />
      </div>
    </Layout>
  );
};

export default Tour;

export const getServerSideProps: GetServerSideProps = async context => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  const { db } = await connectToDatabase(),
    tourId = context.query.tour as string,
    tour = await db.collection("tours").findOne({
      _id: new ObjectId(tourId),
    }),
    guide = await db.collection("users").findOne({
      _id: tour?.guide_id,
    }),
    tours = await db.collection("tours").find({}).toArray();

  return {
    props: {
      user: session?.user ? session.user : null,
      tour: JSON.parse(JSON.stringify(tour)),
      guide: JSON.parse(JSON.stringify(guide)),
      tours: JSON.parse(JSON.stringify(tours)),
    },
  };
};
