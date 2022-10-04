import React, { useEffect, useState } from "react";
import { Calendar as CalendarData } from "calendar";
import Calendar from "./Calendar";
import DatePanel from "./DatePanel";

const DatePicker = () => {
  const [calendar, setCalendar] = useState<number[]>([]),
    [month, setMonth] = useState<number>(new Date().getMonth()),
    [year, setYear] = useState<number>(new Date().getFullYear()),
    [selectedDates, setSelectedDates] = useState<Date[]>([]);

  useEffect(() => {
    const cal = new CalendarData();

    setCalendar(
      cal.monthDays(year, month).reduce((month, week) => month.concat(week), [])
    );
  }, [month, year]);

  const getPrevMonth = () => {
    if (year > new Date().getFullYear()) {
      if (month > 0) {
        setMonth(prevState => prevState - 1);
      } else {
        setMonth(11);
        setYear(prevState => prevState - 1);
      }
    } else {
      if (month > new Date().getMonth()) {
        setMonth(prevState => prevState - 1);
      }
    }
  };

  const getNextMonth = () => {
    if (month < 11) {
      setMonth(prevState => prevState + 1);
    } else {
      setMonth(0);
      setYear(prevState => prevState + 1);
    }
  };

  const selectDate = (date: Date) => {
    setSelectedDates(prevState => [...prevState, date]);
  };

  const removeDate = (date: Date) => {
    setSelectedDates(prevState =>
      prevState.filter(
        d => d.toLocaleDateString() !== date.toLocaleDateString()
      )
    );
  };

  return (
    <div className="absolute top-11 select-none shadow-md">
      {/* DatePicker header */}

      <div className="flex h-[406px]">
        <Calendar
          calendar={calendar}
          month={month}
          year={year}
          getPrevMonth={getPrevMonth}
          getNextMonth={getNextMonth}
          selectDate={selectDate}
          removeDate={removeDate}
          selectedDates={selectedDates}
        />

        <DatePanel selectedDates={selectedDates} removeDate={removeDate} />
      </div>

      {/* Time Picker */}
    </div>
  );
};

export default DatePicker;
