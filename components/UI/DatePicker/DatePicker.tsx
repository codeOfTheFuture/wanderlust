import { FC, useEffect, useState } from "react";
import { Calendar as CalendarData } from "calendar";
import Calendar from "./Calendar";
import DatePanel from "./DatePanel";
import TimePicker from "./TimePicker";
import { SelectedDate } from "../../tour-form/TourForm";

interface Props {
  datePickerOpen: boolean;
  currentSelectedDate: SelectedDate | null;
  selectedDates: SelectedDate[];
  addDate: (date: Date) => void;
  removeDate: (date: Date) => void;
  selectDate: (date: SelectedDate) => void;
  changeTime: (date: Date, hour: number, minute: number) => void;
}

const DatePicker: FC<Props> = ({
  datePickerOpen,
  currentSelectedDate,
  selectedDates,
  addDate,
  removeDate,
  selectDate,
  changeTime,
}) => {
  const [calendar, setCalendar] = useState<number[]>([]),
    [month, setMonth] = useState<number>(new Date().getMonth()),
    [year, setYear] = useState<number>(new Date().getFullYear());

  useEffect(() => {
    const calendarData = new CalendarData();

    setCalendar(
      calendarData
        .monthDays(year, month)
        .reduce((month, week) => month.concat(week), [])
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

  return (
    <div
      className={`absolute top-14 bg-white z-10 select-none shadow-md origin-top transition-transform duration-150 ease-in-out ${
        datePickerOpen ? "scale-y-100" : "scale-y-0"
      } `}>
      {/* DatePicker header */}

      <div className="flex">
        <Calendar
          calendar={calendar}
          month={month}
          year={year}
          getPrevMonth={getPrevMonth}
          getNextMonth={getNextMonth}
          addDate={addDate}
          removeDate={removeDate}
          selectedDates={selectedDates}
        />

        <DatePanel
          currentSelectedDate={currentSelectedDate}
          selectedDates={selectedDates}
          removeDate={removeDate}
          selectDate={selectDate}
        />
      </div>

      <TimePicker
        currentSelectedDate={currentSelectedDate}
        changeTime={changeTime}
      />
    </div>
  );
};

export default DatePicker;
