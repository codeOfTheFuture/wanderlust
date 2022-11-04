import React, { FC, useState } from "react";
import TourCard from "./TourCard";
import { TourResults, User } from "../../types/typings";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchOfferedTours,
  getPopularTours,
  getTourDeals,
  getToursCategory,
  getToursFilter,
  selectTours,
} from "../../store/slices/toursSlice";
import { useRouter } from "next/router";
import { selectUser } from "../../store/slices/userSlice";

const TourCards: FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(8);
  const user = useAppSelector(selectUser) as User;
  const userId = user?._id.toString();
  const router = useRouter();

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

    if (router.pathname === "/offered-tours") {
      dispatch(
        fetchOfferedTours({
          page,
          limit,
          userId,
        })
      );
    }
  };

  return (
    <div
      className={`${
        router.pathname === "/search" && "justify-between h-[100vh] p-4"
      } flex flex-col w-11/12 sm:w-5/6 lg:w-full mx-auto`}>
      <div
        className={`grid ${
          router.pathname === "/search"
            ? "lg:grid-cols-2 mt-16"
            : "lg:grid-cols-3 xl:grid-cols-4 xl:h-[632px]"
        } grid-cols-1 md:grid-cols-2 justify-start items-start gap-6 w-full`}>
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
