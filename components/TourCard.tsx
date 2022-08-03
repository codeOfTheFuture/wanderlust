import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import { Tour } from "../types/types";

interface Props {
  tour: Tour;
}

const TourCard: React.FC<Props> = ({ tour }) => {
  const router: NextRouter = useRouter(),
    { _id, title, tour_photos, price } = tour;

  const SINGLE_TOUR_URL = `/tour?tour=${_id}`;

  const handleClick = () => {
    router.push(SINGLE_TOUR_URL);
  }

  return (
    <div
      className='relative flex flex-col justify-end items-center w-full h-[300px] bg-slate-200 cursor-pointer border-2 border-slate-700 shadow-md rounded-sm px-2'
      onClick={handleClick}
    >
      {tour.tour_photos.length > 0 && (
        <Image
          src={tour_photos[0]}
          alt={title}
          layout='fill'
          className='absolute'
        />
      )}
      <div className='flex flex-col items-start w-full mt-4 p-2 z-10 bg-slate-200'>
        <h2 className='font-semibold'>{title}</h2>
        <p>${price} per person</p>
      </div>
    </div>
  );
};

export default TourCard;
