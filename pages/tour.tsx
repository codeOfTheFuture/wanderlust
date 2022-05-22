import { GetServerSideProps, NextPage } from "next";
import Image from "next/image";
import React from "react";
import Layout from "../components/Layout";
import TourPageHeader from "../components/TourPageHeader";
import { Tour } from "../types/types";

interface Props {
  tour: Tour;
}

const Tour: NextPage<Props> = ({ tour }) => {
  const { title, description, price, duration, tour_date, items_to_bring, tour_photos } = tour;

  return (
    <Layout>
      <div className='h-[1200px]'>
        <TourPageHeader backgroundImage={tour_photos[0]} title={title} />
        <div className="pt-48">
          <h1>{title}</h1>
          <p>{description}</p>

          <div>
            <h2>{price}</h2>
            <p>{duration}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Tour;

const getServerSideProps: GetServerSideProps = async context => {
  const tour_id: string = context.query.tour as string;

  const res: Response = await fetch(
    `http://localhost:3000/api/tours/${tour_id}`
  );

  const tour: Tour = await res.json();

  return {
    props: {
      tour,
    },
  };
};

export { getServerSideProps };
