import { FC } from "react";
import { SelectedDate } from "../../tour-form/TourForm";

interface Props {
  currentSelectedDate: SelectedDate | null;
  selectedDates: SelectedDate[];
  removeDate: (date: Date) => void;
  selectDate: (date: SelectedDate) => void;
}

const DatePanel: FC<Props> = ({
  currentSelectedDate,
  selectedDates,
  removeDate,
  selectDate,
}) => {
  return (
    <div className="w-32 h-[406px] flex flex-col items-center p-1 border-y border-r border-gray-200">
      <h2 className="w-full h-10 flex justify-center items-center my-4 text-lg">
        Dates
      </h2>
      <div className="w-full flex flex-col gap-1">
        {selectedDates.map((selectedDate, index) => {
          const {
            date,
            time: { hour, minute },
          } = selectedDate;

          return (
            <div
              key={index}
              className={`flex justify-between items-center text-white rounded px-1 py-[2px] cursor-pointer ${
                currentSelectedDate?.date === selectedDate.date
                  ? "bg-primary-dark-color border border-black"
                  : "bg-primary-color border-none"
              } `}
              onClick={() => selectDate(selectedDate)}>
              <div className="flex flex-col items-center">
                <div>{date.toLocaleDateString()}</div>
                <div>
                  <span>{hour < 10 ? "0" + hour : hour}</span>
                  <span>:</span>
                  <span>{minute < 10 ? "0" + minute : minute}</span>
                </div>
              </div>
              <button
                className="flex justify-center items-center w-4 h-4 rounded-full bg-gray-200 text-black font-semibold"
                onClick={e => {
                  e.stopPropagation();
                  removeDate(selectedDate.date);
                }}>
                &times;
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DatePanel;
