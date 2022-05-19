import { Tour as TourType } from "../types/types";
import Tour from "./Tour";


interface Props {
  tours: TourType[];
}

const Tours: React.FC<Props> = ({ tours }) => {
  return (
    <div className="relative flex flex-col w-full">
      <h3 className="text-2xl mb-10">Tour Results</h3>
      <div className='grid grid-cols-1 sm:grid-cols-3 justify-center items-center gap-4 lg:gap-24 w-full'>
        {tours?.map(tour => (
          <Tour key={tour._id.toString()} tour={tour} />
        ))}
      </div>
    </div>
  );
};

export default Tours;
