import React from "react";
import { GetServerSideProps, NextPage } from "next";
import { ObjectId } from "mongodb";
import Layout from "../components/Layouts/Layout";
import RecommendedTours from "../components/TourCards/RecommendedTours";
import TourDetails from "../components/TourPage/TourDetails";
import TourPageHeader from "../components/TourPage/TourPageHeader";
import { connectToDatabase } from "../lib/mongodb";
import { Tour, User } from "../types/typings";

interface Props {
  tours: Tour[];
  tour: Tour;
  guide: User;
}

const Tour: NextPage<Props> = ({ tour, tours, guide }) => {
  const { title, tour_photos } = tour;

  return (
    <div className="relative font-poppins">
      <Layout>
        <div className="flex flex-col justify-center items-center gap-5">
          <TourPageHeader backgroundImage={tour_photos[0]} title={title} />
          <TourDetails tour={tour} guide={guide} />
          <div className="w-11/12 xl:w-1/2 h-[1px] mx-auto bg-black"></div>
          <RecommendedTours tours={tours} />
        </div>
      </Layout>
    </div>
  );
};

export default Tour;

export const getServerSideProps: GetServerSideProps = async context => {
  const { db } = await connectToDatabase();
  const tourId = context.query.tour as string;

  const tour = await db.collection("tours").findOne({
    _id: new ObjectId(tourId),
  });

  const guide = await db.collection("users").findOne({
    _id: tour?.guide_id,
  });

  const tours = await db.collection("tours").find({}).toArray();

  return {
    props: {
      tour: JSON.parse(JSON.stringify(tour)),
      guide: JSON.parse(JSON.stringify(guide)),
      tours: JSON.parse(JSON.stringify(tours)),
    },
  } as { props: { tour: Tour; guide: User; tours: Tour[] } };
};
