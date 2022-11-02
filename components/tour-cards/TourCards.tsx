import React, { FC, useState } from "react";
import TourCard from "./TourCard";
import { TourResults } from "../../types/typings";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  getPopularTours,
  getTourDeals,
  getToursCategory,
  getToursFilter,
  selectTours,
} from "../../store/slices/toursSlice";

const TourCards: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);

  const toursResults = useAppSelector(selectTours) as TourResults;

  const filter = useAppSelector(getToursFilter);

  const dispatch = useAppDispatch();

  const handlePagination = (page: number) => {
    setCurrentPage(page);

    if (filter === "popular") {
      dispatch(getPopularTours({ page, limit }));
    }
    if (filter === "deals") {
      dispatch(getTourDeals({ page, limit }));
    }
    if (filter === "categories") {
      // dispatch()
    }
  };

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
              handlePagination(toursResults.previous.page);
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
              handlePagination(toursResults.next.page);
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
