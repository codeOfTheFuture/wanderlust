import { FC, useState } from "react";
import { SelectedDate } from "../../tour-form/TourForm";
import TimePickerDigitSelect from "./TimePickerDigitSelect";

interface Props {
  currentSelectedDate: SelectedDate | null;
  changeTime: (date: Date, hour: number, minute: number) => void;
}

const TimePicker: FC<Props> = ({ currentSelectedDate, changeTime }) => {
  const [hour, setHour] = useState<number>(1),
    [minute, setMinute] = useState<number>(0);

  const incrementHour = (currHour: number) => {
    if (currHour < 24) setHour(prevHour => prevHour + 1);
    else setHour(1);

    currentSelectedDate &&
      changeTime(currentSelectedDate.date, hour + 1, minute);
  };

  const decrementHour = (currHour: number) => {
    if (currHour > 1) setHour(prevHour => prevHour - 1);
    else setHour(24);

    currentSelectedDate &&
      changeTime(currentSelectedDate.date, hour - 1, minute);
  };

  const incrementMinute = (currMinute: number) => {
    if (currMinute < 60) setMinute(prevMinute => prevMinute + 1);
    else setMinute(0);

    currentSelectedDate &&
      changeTime(currentSelectedDate.date, hour, minute + 1);
  };

  const decrementMinute = (currMinute: number) => {
    if (currMinute > 0) setMinute(prevMinute => prevMinute - 1);
    else setMinute(60);

    currentSelectedDate &&
      changeTime(currentSelectedDate.date, hour, minute - 1);
  };

  return (
    <div className="flex justify-around items-center border-x border-gray-200 p-2">
      <TimePickerDigitSelect
        digit={hour}
        increment={incrementHour}
        decrement={decrementHour}
      />

      <div className="text-3xl">:</div>

      <TimePickerDigitSelect
        digit={minute}
        increment={incrementMinute}
        decrement={decrementMinute}
      />
    </div>
  );
};

export default TimePicker;
