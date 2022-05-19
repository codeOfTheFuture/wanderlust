import { Tour } from "../types/types";

interface Props {
  tour: Tour;
}

const Tour: React.FC<Props> = ({ tour }) => {
  return (
    <div className="flex flex-col justify-end items-start w-full h-[300px] p-5 bg-slate-400">
      <h2>{tour.title}</h2>
      <p>${tour.price} per person</p>
    </div>
  )
}

export default Tour;