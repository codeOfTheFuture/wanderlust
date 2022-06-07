import { GetServerSideProps, NextPage } from "next";
import React from "react";
import Layout from "../components/Layout";
import RecommendedTours from "../components/RecommendedTours";
import TourDetails from "../components/TourDetails";
import TourPageHeader from "../components/TourPageHeader";
import { Tour, User } from "../types/types";

interface Props {
  tours: Tour[];
  tour: Tour;
  guide: User;
}

const Tour: NextPage<Props> = ({ tours, tour, guide }) => {
  const { title, tour_photos } = tour;

  return (
    <Layout>
      <div className='flex flex-col justify-center items-center gap-5'>
        <TourPageHeader backgroundImage={tour_photos[0]} title={title} />
        <TourDetails tour={tour} guide={guide} />
        <div className="w-1/2 h-[1px] mx-auto bg-black"></div>
        <RecommendedTours tours={tours} />
      </div>
    </Layout>
  );
};

export default Tour;

const getServerSideProps: GetServerSideProps = async context => {
  const tour_id: string = context.query.tour as string;
  let res: Response;

  res = await fetch(
    `https://wanderlust-liart.vercel.app/api/tours/${tour_id}`
  );

  const tour: Tour = await res.json();

  res = await fetch(
    `https://wanderlust-liart.vercel.app/api/users/${tour.guide_id.toString()}`
  );

  const guide: User = await res.json();

  res = await fetch(
    `https://wanderlust-liart.vercel.app/api/tours`
  );

  const tours: Tour[] = await res.json();

  return {
    props: {
      tours,
      tour,
      guide,
    },
  };
};

export { getServerSideProps };
