import { Tour } from "../../types/typings";
import TourCard from "./TourCard";

interface Props {
  tours: Tour[];
}

const RecommendedTours: React.FC<Props> = ({ tours }) => {
  return (
    <div className="flex flex-col lg:flex-row gap-5 mb-5 w-11/12 xl:w-1/2">
      {tours?.map((tour, index) => {
        return index < 3 && <TourCard key={index} tour={tour} />;
      })}
    </div>
  );
};

export default RecommendedTours;
