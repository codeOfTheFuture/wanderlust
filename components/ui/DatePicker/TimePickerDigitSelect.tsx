import { FC } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";

interface Props {
  digit: number;
  increment: (digit: number) => void;
  decrement: (digit: number) => void;
}

const TimePickerDigitSelect: FC<Props> = ({ digit, increment, decrement }) => {
  return (
    <div className="flex flex-col items-center gap-2 text-primary-color">
      <div
        className="w-8 h-8 rounded-full cursor-pointer"
        onClick={() => increment(digit)}>
        <ChevronUpIcon />
      </div>

      <div className="text-black">{digit < 10 ? "0" + digit : digit}</div>

      <div
        className="w-8 h-8 rounded-full cursor-pointer"
        onClick={() => decrement(digit)}>
        <ChevronDownIcon />
      </div>
    </div>
  );
};

export default TimePickerDigitSelect;
