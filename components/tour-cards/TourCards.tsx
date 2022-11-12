import React, { FC, useEffect, useState } from "react";
import TourCard from "./TourCard";
import { TourResults, User } from "../../types/typings";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchOfferedTours,
  getPopularTours,
  getTourDeals,
  getToursCategory,
  getToursFilter,
  getToursStatus,
  getUserFavoriteTours,
  selectTours,
} from "../../store/slices/toursSlice";
import { useRouter } from "next/router";
import { selectUser } from "../../store/slices/userSlice";
import ReactLoading from "react-loading";

interface Props {
  loading: boolean;
}

const TourCards: FC<Props> = ({ loading }) => {
  const { _id } = useAppSelector(selectUser) as User;
  const userId = _id.toString();
  const router = useRouter();

  const toursResults = useAppSelector(selectTours) as TourResults;
  const currentPage = toursResults.currentPage;
  const limit = toursResults.limit;

  const filter = useAppSelector(getToursFilter);

  const dispatch = useAppDispatch();

  const handlePagination = (page: number) => {
    if (filter === "popular" && router.pathname === "/") {
      dispatch(getPopularTours({ page, limit }));
    }
    if (filter === "deals" && router.pathname === "/") {
      dispatch(getTourDeals({ page, limit }));
    }
    if (filter === "categories" && router.pathname === "/") {
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

    if (router.pathname === "/favorite-tours") {
      dispatch(getUserFavoriteTours({ page, limit, userId }));
    }
  };

  return (
    <div
      className={`${
        router.pathname === "/search" && "justify-between h-[100vh] p-4"
      } flex flex-col w-11/12 sm:w-5/6 lg:w-full mx-auto bg-white relative ${
        loading && "overflow-hidden"
      }`}>
      {loading && (
        <div className="w-full absolute top-36 flex justify-center items-center z-10">
          <div className="flex justify-center items-center w-40 bg-white rounded-2xl z-50">
            <ReactLoading
              type={"bars"}
              width={100}
              height={100}
              color="#2196f3"
              className="bg-transparent"
            />
          </div>
        </div>
      )}
      <div
        className={`grid ${
          router.pathname === "/search"
            ? "lg:grid-cols-2 mt-16"
            : "lg:grid-cols-3 xl:grid-cols-4 xl:h-[632px]"
        } grid-cols-1 md:grid-cols-2 justify-start items-start gap-6 w-full ${
          loading && "opacity-50"
        }`}>
        {toursResults?.results?.map(tour => (
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
          {currentPage?.toString()}
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
