import React, { FC } from "react";
import { Tour, User } from "../../types/typings";
import {
  InformationCircleIcon,
  ClockIcon,
  DocumentTextIcon,
  UserIcon,
  LocationMarkerIcon,
  ChatAltIcon,
} from "@heroicons/react/solid";
import { HeartIcon } from "@heroicons/react/outline";
import Image from "next/image";
import Button from "../ui/Button";
import {
  addTourToFavorites,
  bookTour,
  selectUser,
  unBookTour,
} from "../../store/slices/userSlice";
import { useAppDispatch, useAppSelector } from "../../store";

interface Props {
  tour: Tour;
  guide: User;
}

const TourDetails: FC<Props> = ({ tour, guide }) => {
  const {
    _id,
    description,
    price,
    duration,
    recommendedAges,
    address,
    tourDates,
    whatToBring,
    tourPhotos,
  } = tour;

  const user = useAppSelector(selectUser) as User;
  const dispatch = useAppDispatch();

  const userId = user?._id.toString() as string,
    tourId = _id.toString();

  const favoriteTour =
      user?.favoriteTours.find(t => t._id === tour._id) != null,
    bookedTour = user.bookedTours.find(t => t._id === tour._id) != null;

  const handleClick = () => {
    dispatch(addTourToFavorites({ userId, tourId }));
  };

  const handleBookTour = () => {
    dispatch(bookTour({ tourId: _id.toString(), userId: user._id.toString() }));
  };

  const handleUnbookTour = () => {
    dispatch(
      unBookTour({ tourId: _id.toString(), userId: user._id.toString() })
    );
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 w-full xl:w-1/2 mx-auto mt-5">
      <div className="col-span-1 md:col-span-2 flex flex-col gap-6 p-5">
        <h2 className="text-lg font-semibold ml-[3.5rem]">About this tour</h2>
        <div className="flex items-center">
          <InformationCircleIcon className="w-20 h-20" />
          <p className="ml-2">{description}</p>
        </div>
        <div className="flex items-center">
          <ClockIcon className="w-12 h-12" />
          <div className="ml-2">
            <span>Duration: {duration}</span>
          </div>
        </div>
        <div className="flex items-center">
          <UserIcon className="w-12 h-12" />
          <div className="ml-2">
            <span>Recommended ages: {recommendedAges}</span>
          </div>
        </div>
        <div className="flex items-center">
          <DocumentTextIcon className="w-12 h-12" />
          <div className="flex flex-col ml-2">
            <p>What to Bring</p>
            <ul className="ml-8">
              {whatToBring.split("\n").map((item, index) => (
                <li key={index} className="list-disc">
                  {item.match(/[a-zA-Z]/gi)}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="flex items-center">
          <LocationMarkerIcon className="w-12 h-12" />
          <div className="ml-2">
            <p>Location</p>
            <p>{address.placeName}</p>
          </div>
        </div>
      </div>
      <div className="col-span-1 p-5 flex flex-col items-center gap-4">
        <div className="flex gap-5">
          <div className="flex flex-col font-semibold">
            <p>US $ {price}</p>
            <p>per person</p>
          </div>
          <Button
            color="btn-primary"
            size="btn-md"
            type="button"
            onClick={bookedTour ? handleUnbookTour : handleBookTour}>
            {bookedTour ? "Unbook Now" : "Book Now"}
          </Button>
        </div>
        <div className="bg-black h-[1px] w-full"></div>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={handleClick}>
          <HeartIcon
            className={`${favoriteTour && "text-error-color"} w-8 h-8`}
          />
          <span className="text-lg font-semibold">Add to favorites</span>
        </div>
        <div className="mt-20">
          <div className="w-[200px] rounded-full">
            <Image
              src={guide.profileImage.secure_url}
              alt={guide.name}
              layout="responsive"
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
        </div>
        <div className="flex items-center gap-2 cursor-pointer">
          <p className="text-lg font-semibold">Message the guide</p>
          <ChatAltIcon className="w-14 h-14 text-primary-color" />
        </div>
      </div>
    </div>
  );
};

export default TourDetails;
