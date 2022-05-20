import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { Tour } from "../types/types";

interface Props {
  tour: Tour;
}

const TourCard: React.FC<Props> = ({ tour }) => {
  const router = useRouter();

  return (
    <div
      className='flex flex-col justify-end items-center w-full h-[300px] p-5 bg-slate-200 cursor-pointer border border-slate-400 shadow-md rounded-xl'
      onClick={() => router.push(`/tour?tour=${tour._id.toString()}`)}
    >
      {tour.tour_photos.length > 0 && (
        <Image
          src={tour.tour_photos[0]}
          alt={tour.title}
          width={400}
          height={300}
          className='object-cover'
        />
      )}
      <div className='flex flex-col items-start w-full mt-4'>
        <h2 className='font-semibold'>{tour.title}</h2>
        <p>${tour.price} per person</p>
      </div>
    </div>
  );
};

export default TourCard;
