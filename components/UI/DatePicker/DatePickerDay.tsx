import React, { FC, useEffect, useState } from "react";

interface Props {
  day: number;
  month: number;
  year: number;
  selectedDates: Date[];
  selectDate: (date: Date) => void;
  removeDate: (date: Date) => void;
}

const DatePickerDay: FC<Props> = ({
  day,
  month,
  year,
  selectedDates,
  selectDate,
  removeDate,
}) => {
  const [dateSelected, setDateSelected] = useState(false);

  useEffect(() => {
    setDateSelected(
      selectedDates.find(
        d =>
          d.toLocaleDateString() ===
          new Date(year, month, day).toLocaleDateString()
      ) != null
    );
  }, [selectedDates, day, month, year]);

  return day === 0 ? (
    <div></div>
  ) : (
    <div
      className={`${
        dateSelected && "bg-primary-color text-white"
      } flex justify-center items-center w-11 h-11 text-center cursor-pointer rounded-full z-20 hover:bg-primary-light-color hover:text-white`}
      onClick={() =>
        dateSelected
          ? removeDate(new Date(year, month, day))
          : selectDate(new Date(year, month, day))
      }>
      {day}
    </div>
  );
};

export default DatePickerDay;
