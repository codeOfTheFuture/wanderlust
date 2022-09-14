import React, { Dispatch, FC, SetStateAction } from "react";

interface Props {
  checked: boolean;
  handleChange: Dispatch<SetStateAction<boolean>>;
}

const Checkbox: FC<Props> = ({ checked, handleChange }) => {
  return (
    <input
      className="w-5 h-5"
      type="checkbox"
      checked={checked}
      onChange={() => handleChange(prevState => !prevState)}
    />
  );
};

export default Checkbox;
