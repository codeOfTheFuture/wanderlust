import React, { FC, useEffect, useState } from "react";
import { SelectedDate } from "../../Tour-form/TourForm";

interface Props {
  day: number;
  month: number;
  year: number;
  selectedDates: SelectedDate[];
  addDate: (date: Date) => void;
  removeDate: (date: Date) => void;
}

const DatePickerDay: FC<Props> = ({
  day,
  month,
  year,
  selectedDates,
  addDate,
  removeDate,
}) => {
  const [dateSelected, setDateSelected] = useState(false);

  const calenderDate = new Date(year, month, day),
    todaysDate = new Date();

  useEffect(() => {
    setDateSelected(
      selectedDates.find(
        d =>
          new Date(d.date).toDateString() ===
          new Date(year, month, day).toDateString()
      ) != null
    );
  }, [selectedDates, day, month, year]);

  return day === 0 ? (
    <div></div>
  ) : (
    <div
      className={`${dateSelected && "bg-primary-color text-white"} ${
        calenderDate < todaysDate
          ? "text-gray-300 cursor-not-allowed"
          : "text-black hover:bg-primary-light-color hover:text-white"
      } flex justify-center items-center w-11 h-11 text-center cursor-pointer rounded-full`}
      onClick={() =>
        dateSelected
          ? removeDate(new Date(year, month, day))
          : calenderDate >= todaysDate && addDate(new Date(year, month, day))
      }>
      {day}
    </div>
  );
};

export default DatePickerDay;
