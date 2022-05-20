import { NextPage, NextPageContext } from "next";
import React from "react";
import { Tour } from "../types/types";

interface Props {
  tour: Tour;
}

type Context = NextPageContext;

const Tour: NextPage<Props> = ({ tour }) => {
  return (
    <div>
      <h1>{tour.title}</h1>
      <p>{tour.description}</p>

      <div>
        <h2>{tour.price}</h2>
        <p>{tour.duration}</p>
      </div>
    </div>
  );
};

export default Tour;

const getServerSideProps = async (context: Context) => {
  const tour_id: string = context.query.tour as string;

  const res = await fetch(`http://localhost:3000/api/tours/${tour_id}`);
  const tour = await res.json();

  return {
    props: {
      tour,
    },
  };
};

export { getServerSideProps };
