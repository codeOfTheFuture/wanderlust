import { Tour } from "../types/types";
import TourCard from "./TourCard";

interface Props {
  tours: Tour[];
}

const TourCardWrapper: React.FC<Props> = ({ tours }) => {
  const page = 1;
  return (
    <div className='flex flex-col w-full mt-20'>
      <h3 className='text-2xl mb-10'>Tour Results</h3>
      <div className='grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 justify-center items-center gap-8 w-full'>
        {tours?.map(tour => (
          <TourCard key={tour._id.toString()} tour={tour} />
        ))}
      </div>
      <div className="flex justify-between items-center my-8 w-full">
        <div className={`${page === 1 && "opacity-0"}`}>Previous</div>
        <span className="font-semibold cursor-pointer">1</span>
        <div className="font-semibold cursor-pointer">Next</div>
      </div>
    </div>
  );
};

export default TourCardWrapper;
