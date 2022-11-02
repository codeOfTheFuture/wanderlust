import React, { FC, useState } from "react";
import TourCard from "./TourCard";
import { TourResults } from "../../types/typings";
import { useAppDispatch, useAppSelector } from "../../store";
import { getPopularTours, selectTours } from "../../store/slices/toursSlice";

const TourCards: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);

  const toursResults = useAppSelector(selectTours) as TourResults;

  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col w-11/12 sm:w-5/6 lg:w-full mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-start items-start gap-6 w-full xl:h-[632px]">
        {toursResults.results?.map(tour => (
          <TourCard key={tour._id.toString()} tour={tour} />
        ))}
      </div>
      <div className="flex justify-between items-center my-8 w-full">
        <div
          onClick={() => {
            if (toursResults.previous != null) {
              const page = toursResults.previous?.page as number;
              setCurrentPage(page);
              dispatch(getPopularTours({ page, limit }));
            }
          }}
          className="font-semibold cursor-pointer">
          Previous
        </div>

        <span className="font-semibold cursor-pointer bg-primary-color text-white text-lg w-10 h-10 rounded flex justify-center items-center">
          {currentPage}
        </span>

        <div
          onClick={() => {
            if (toursResults.next != null) {
              const page = toursResults.next?.page as number;
              setCurrentPage(page);
              dispatch(getPopularTours({ page, limit }));
            }
          }}
          className="font-semibold cursor-pointer">
          Next
        </div>
      </div>
    </div>
  );
};

export default TourCards;
