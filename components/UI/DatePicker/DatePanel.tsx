import { FC } from "react";

interface Props {
  selectedDates: Date[];
  removeDate: (date: Date) => void;
}

const DatePanel: FC<Props> = ({ selectedDates, removeDate }) => {
  return (
    <div className="w-32 h-full flex flex-col items-center p-1 bg-white border-y border-r border-gray-200">
      <h2 className="w-full h-10 flex justify-center items-center my-4 text-lg">
        Dates
      </h2>
      <div className="w-full flex flex-col gap-1">
        {selectedDates.map((date, index) => (
          <div
            key={index}
            className="flex justify-between items-center bg-primary-color text-white rounded px-1 py-[2px]">
            {date.toLocaleDateString()}
            <button
              className="flex justify-center items-center w-4 h-4 rounded-full bg-gray-200 text-black font-semibold"
              onClick={() => removeDate(date)}>
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DatePanel;
