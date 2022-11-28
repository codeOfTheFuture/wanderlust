import { useRouter } from "next/router";
import { FC } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import {
  fetchOfferedTours,
  getPopularTours,
  getTourDeals,
  getToursFilter,
  getUserFavoriteTours,
  selectTours,
} from "../../store/slices/toursSlice";
import { selectUser } from "../../store/slices/userSlice";
import { TourResults, User } from "../../types/typings";

const Pagination: FC = () => {
  const toursResults = useAppSelector(selectTours) as TourResults;
  const filter = useAppSelector(getToursFilter);
  const user = useAppSelector(selectUser) as User;
  const userId = user?._id.toString();

  const currentPage = toursResults.currentPage;
  const limit = toursResults.limit;

  const { pathname } = useRouter();
  const dispatch = useAppDispatch();

  const handlePagination = (page: number) => {
    if (filter === "popular" && pathname === "/") {
      dispatch(getPopularTours({ page, limit }));
    }
    if (filter === "deals" && pathname === "/") {
      dispatch(getTourDeals({ page, limit }));
    }
    if (filter === "categories" && pathname === "/") {
      // dispatch()
    }

    if (pathname === "/offered-tours") {
      dispatch(
        fetchOfferedTours({
          page,
          limit,
          userId,
        })
      );
    }

    if (pathname === "/favorite-tours") {
      dispatch(getUserFavoriteTours({ page, limit, userId }));
    }
  };

  return (
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
  );
};

export default Pagination;
