import Image from "next/image";
import { NextRouter, useRouter } from "next/router";
import { Tour } from "../types/types";

interface Props {
  tour: Tour;
}

const TourCard: React.FC<Props> = ({ tour }) => {
  const router: NextRouter = useRouter(),
    { _id, title, tour_photos, price } = tour;

  return (
    <div
      className='flex flex-col justify-end items-center w-full h-[300px] p-5 bg-slate-200 cursor-pointer border border-slate-400 shadow-md rounded-sm'
      onClick={() => router.push(`/tour?tour=${_id.toString()}`)}
    >
      {tour.tour_photos.length > 0 && (
        <Image
          src={tour_photos[0]}
          alt={title}
          width={400}
          height={300}
          className='object-cover'
        />
      )}
      <div className='flex flex-col items-start w-full mt-4'>
        <h2 className='font-semibold'>{title}</h2>
        <p>${price} per person</p>
      </div>
    </div>
  );
};

export default TourCard;
