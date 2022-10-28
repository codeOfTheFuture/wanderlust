import React, { FC, useRef, useState } from "react";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@heroicons/react/solid";
import {
  categoriesClicked,
  getPopularTours,
  getTourDeals,
  getToursFilter,
} from "../../store/slices/toursSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import NavDropdown from "./NavDropdown";
import useClickOutside from "../../hooks/useClickOutside";
import NavCategoryOption from "./NavCategoryOption";

const NavCenter: FC = () => {
  const router = useRouter();
  const toursFilter = useAppSelector(getToursFilter);
  const dispatch = useAppDispatch();

  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  const dropDownRef = useRef<HTMLLIElement>(null);

  useClickOutside(dropDownRef, () => {
    setToggleDropdown(false);
  });

  const fetchPopularTours = () => {
    dispatch(getPopularTours());
  };

  const fetchTourDeals = () => {
    dispatch(getTourDeals());
  };

  const handleCategoriesClick = () => {
    setToggleDropdown(prevState => !prevState);
    dispatch(categoriesClicked());
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
          <li
            className="relative flex items-center hover:cursor-pointer"
            onClick={handleCategoriesClick}
            ref={dropDownRef}>
            Categories
            <ChevronDownIcon
              className={`w-6 transition-transform duration-300 ease-in-out ${
                toggleDropdown ? "-rotate-180" : "rotate-0"
              }`}
            />
            <NavDropdown toggleDropdown={toggleDropdown}>
              <NavCategoryOption category="Hiking" />
              <NavCategoryOption category="Cruise" />
              <NavCategoryOption category="Bus" />
              <NavCategoryOption category="Helicopter" />
              <NavCategoryOption category="City" />
              <NavCategoryOption category="National Park" />
              <NavCategoryOption category="Historical" />
            </NavDropdown>
          </li>
        </ul>
      )}
    </>
  );
};

export default NavCenter;
