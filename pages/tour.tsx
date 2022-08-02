import { NextPage } from "next";
import React from "react";
import Layout from "../components/Layout";
import RecommendedTours from "../components/RecommendedTours";
import TourDetails from "../components/TourDetails";
import TourPageHeader from "../components/TourPageHeader";
import { Tour, User } from "../types/types";
// import { getAllTours } from "./api/tours";


interface Props {
  tours: Tour[];
  tour: Tour;
  guide: User;
}

const Tour: NextPage<Props> = () => {
  // const { title, tour_photos } = tour;

  // console.log(tour, guide, tours);
  return (
    <Layout>
      {/* <div className='flex flex-col justify-center items-center gap-5'>
        <TourPageHeader backgroundImage={tour_photos[0]} title={title} />
        <TourDetails tour={tour} guide={guide} />
        <div className='w-1/2 h-[1px] mx-auto bg-black'></div>
        <RecommendedTours tours={tours} />
      </div> */}
    </Layout>
  );
};

export default Tour;

// const getServerSideProps: GetServerSideProps = async context => {
//   const tour_id: string = context.query.tour as string;

//   const tour: Tour = await getTourById(tour_id);

//   const [tours, guide]: [Tour[], User] = await Promise.all([
//     getAllTours(),
//     getUserById(tour.guide_id.toString()),
//   ]);

//   return {
//     props: {
//       tours: JSON.parse(JSON.stringify(tours)),
//       tour: JSON.parse(JSON.stringify(tour)),
//       guide: JSON.parse(JSON.stringify(guide)),
//     },
//   };
// };

// export { getServerSideProps };
