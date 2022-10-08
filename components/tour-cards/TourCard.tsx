import React, { FC } from "react";
import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import { Tour } from "../../types/typings";

interface Props {
  tour: Tour;
}

const TourCard: FC<Props> = ({ tour }) => {
  const router: NextRouter = useRouter(),
    { _id, title, tourPhotos, price } = tour;

  const url = `/tour?tour=${_id}`;

  const handleClick = () => {
    router.push(url);
  };

  return (
    <div
      className="relative flex flex-col justify-end items-center w-full h-[300px] bg-slate-200 cursor-pointer border-2 border-slate-700 shadow-lg hover:shadow-xl rounded-sm px-2 hover:scale-105 transition-transform duration-300 ease-in-out"
      onClick={handleClick}>
      {tour.tourPhotos.length > 0 && (
        <Image
          src={tourPhotos[0].secure_url}
          alt={title}
          layout="fill"
          className="absolute"
        />
      )}
      <div className="flex flex-col items-start w-full mt-4 p-2 z-10 bg-slate-200">
        <h2 className="font-semibold">{title}</h2>
        <p>${price} per person</p>
      </div>
    </div>
  );
};

export default TourCard;
