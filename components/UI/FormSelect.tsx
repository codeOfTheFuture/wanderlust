import React, { FC } from "react";

interface Props {
  name: string;
  defaultText: string;
  optionsList: string[];
  selectStyles: string;
}

const FormSelect: FC<Props> = props => {
  const { name, defaultText, optionsList, selectStyles } = props;

  return (
    <div className={selectStyles}>
      <label htmlFor={name}>Select</label>
      <select name={name} id={name} className="p-5 bg-transparent">
        <option value="" disabled selected>
          {defaultText}
        </option>
        {optionsList.map(option => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
