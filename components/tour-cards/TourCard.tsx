import React, { FC } from "react";
import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import { Tour, User } from "../../types/typings";
import { HeartIcon, PencilAltIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";

interface Props {
  tour: Tour;
}

const TourCard: FC<Props> = ({ tour }) => {
  const user = useSelector(selectUser) as User;
  const { _id, guideId, title, tourPhotos, price } = tour;
  const router: NextRouter = useRouter();

  const tourPageUrl = `/tour?tour=${_id}`;
  const updateTourUrl = `/update-tour?tour=${_id}`;

  const handleClick = () => {
    if (
      user?.id.toString() === guideId &&
      router.pathname === "/offered-tours"
    ) {
      router.push(updateTourUrl);
    } else {
      router.push(tourPageUrl);
    }
  };

  return (
    <div
      className="relative flex flex-col justify-end items-center w-full h-[300px] bg-slate-200 cursor-pointer border-2 border-slate-700 shadow-lg hover:shadow-xl rounded-sm px-2"
      onClick={handleClick}>
      {tour.tourPhotos.length > 0 && (
        <Image
          src={tourPhotos[0].secure_url}
          alt={title}
          layout="fill"
          objectFit="cover"
          className="absolute"
        />
      )}

      {user?.id.toString() === guideId &&
      router.pathname === "/offered-tours" ? (
        <PencilAltIcon className="absolute top-2 right-2 w-10 text-black opacity-90 hover:scale-125 transition-all duration-300 ease-in-out" />
      ) : (
        <HeartIcon className="absolute top-2 right-2 w-10 text-gray-50 opacity-90 hover:scale-125 transition-all duration-300 ease-in-out" />
      )}

      <div className="flex flex-col items-start w-full mt-4 p-2 z-10 bg-slate-200">
        <h2 className="font-semibold">{title}</h2>
        <p>${price} per person</p>
      </div>
    </div>
  );
};

export default TourCard;
