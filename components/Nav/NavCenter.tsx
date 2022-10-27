import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@heroicons/react/solid";
import {
  getPopularTours,
  getTourDeals,
  getToursFilter,
} from "../../store/slices/toursSlice";
import { useAppDispatch, useAppSelector } from "../../store";

const NavCenter: FC = () => {
  const router = useRouter();
  const toursFilter = useAppSelector(getToursFilter);
  const dispatch = useAppDispatch();

  const fetchPopularTours = () => {
    dispatch(getPopularTours());
  };

  const fetchTourDeals = () => {
    dispatch(getTourDeals());
  };

  return (
    <>
      {router.pathname === "/" && (
        <ul className="hidden md:flex justify-around items-center gap-8 h-full text-xl">
          <li
            className={`pb-1 hover:cursor-pointer ${
              toursFilter === "popular" && "border-b-2 border-white"
            }`}
            onClick={fetchPopularTours}>
            Popular
          </li>
          <li
            className={`pb-1 hover:cursor-pointer ${
              toursFilter === "deals" && "border-b-2 border-white"
            }`}
            onClick={fetchTourDeals}>
            Deals
          </li>
          <li className="flex items-center hover:cursor-pointer">
            Categories
            <ChevronDownIcon className="w-6" />
          </li>
        </ul>
      )}
    </>
  );
};

export default NavCenter;
