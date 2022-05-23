import { Tour } from "../types/types";
import TourCard from "./TourCard";

interface Props {
  tours: Tour[];
}

const RecommendedTours: React.FC<Props> = ({ tours }) => {
  return (
    <div className="flex gap-5 mb-5">
      {tours?.map((tour, index) => {
        return index < 3 && (
          <TourCard key={index} tour={tour} />
        )
      })}
    </div>
  )
}

export default RecommendedTours;