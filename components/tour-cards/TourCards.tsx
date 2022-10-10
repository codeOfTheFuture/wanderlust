import React, { FC } from "react";
import TourCard from "./TourCard";
import { Tour } from "../../types/typings";

interface Props {
  tours: Tour[];
}

const TourCards: FC<Props> = ({ tours }) => {
  const page = 1;

  return (
    <div className="flex flex-col w-11/12 sm:w-5/6 lg:w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-center items-center gap-8 w-full">
        {tours?.map(tour => (
          <TourCard key={tour._id.toString()} tour={tour} />
        ))}
      </div>
      {/* <div className="flex justify-between items-center mt-12 mb-24 w-full">
        <div className={`${page === 1 && "opacity-0"}`}>Previous</div>
        <span className="font-semibold cursor-pointer">1</span>
        <div className="font-semibold cursor-pointer">Next</div>
      </div> */}
    </div>
  );
};

export default TourCards;
