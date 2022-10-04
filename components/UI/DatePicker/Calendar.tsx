import React, { FC } from "react";
import DatePickerDay from "./DatePickerDay";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { genMonth } from "../../../utils/getMonth";

interface Props {
  calendar: number[];
  month: number;
  year: number;
  selectedDates: Date[];
  getPrevMonth: () => void;
  getNextMonth: () => void;
  selectDate: (date: Date) => void;
  removeDate: (date: Date) => void;
}

const Calendar: FC<Props> = ({
  calendar,
  month,
  year,
  selectedDates,
  getPrevMonth,
  getNextMonth,
  selectDate,
  removeDate,
}) => {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div className="border border-gray-200 flex flex-col justify-center items-center z-10 bg-white p-5">
      <div className="flex justify-between items-center text-lg w-full">
        <div
          className="w-10 h-10 rounded-full text-primary-color hover:bg-primary-color hover:text-white cursor-pointer"
          onClick={getPrevMonth}>
          <ChevronLeftIcon />
        </div>
        {genMonth(month)}, {year}
        <div
          className="w-10 h-10 rounded-full text-primary-color hover:bg-primary-color hover:text-white cursor-pointer"
          onClick={getNextMonth}>
          <ChevronRightIcon />
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 w-[304px] text-primary-color font-semibold">
        {days.map((day, index) => (
          <div
            key={index}
            className="flex justify-center items-center w-10 h-10">
            {day}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 w-[304px]">
        {calendar.map((day, index) => (
          <DatePickerDay
            key={index}
            day={day}
            month={month}
            year={year}
            selectedDates={selectedDates}
            selectDate={selectDate}
            removeDate={removeDate}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
