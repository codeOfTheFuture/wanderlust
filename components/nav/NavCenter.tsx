import { FC, Fragment, useRef, useState } from "react";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@heroicons/react/solid";
import {
  categoriesClicked,
  fetchTourCategory,
  getPopularTours,
  getTourDeals,
  getToursFilter,
} from "../../store/slices/toursSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import NavDropdown from "./NavDropdown";
import useClickOutside from "../../hooks/useClickOutside";
import NavCategoryOption from "./NavCategoryOption";

const NavCenter: FC = () => {
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  const toursFilter = useAppSelector(getToursFilter);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const dropDownRef = useRef<HTMLLIElement>(null);

  useClickOutside(dropDownRef, () => {
    setToggleDropdown(false);
  });

  const fetchPopularTours = () => {
    dispatch(getPopularTours({ page: 1, limit: 8 }));
  };

  const fetchTourDeals = () => {
    dispatch(getTourDeals({ page: 1, limit: 8 }));
  };

  const handleCategoriesClick = () => {
    setToggleDropdown(prevState => !prevState);
    dispatch(categoriesClicked());
  };

  const getTourCategory = (category: string) => {
    dispatch(fetchTourCategory(category));
  };

  return (
    <Fragment>
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
              <NavCategoryOption
                category="Hiking"
                handleClick={() => getTourCategory("hiking")}
              />
              <NavCategoryOption
                category="Cruise"
                handleClick={() => getTourCategory("cruise")}
              />
              <NavCategoryOption
                category="Bus"
                handleClick={() => getTourCategory("bus")}
              />
              <NavCategoryOption
                category="Helicopter"
                handleClick={() => getTourCategory("helicopter")}
              />
              <NavCategoryOption
                category="City"
                handleClick={() => getTourCategory("city")}
              />
              <NavCategoryOption
                category="National Park"
                handleClick={() => getTourCategory("national-park")}
              />
              <NavCategoryOption
                category="Historical Places"
                handleClick={() => getTourCategory("historical-places")}
              />
            </NavDropdown>
          </li>
        </ul>
      )}
    </Fragment>
  );
};

export default NavCenter;
