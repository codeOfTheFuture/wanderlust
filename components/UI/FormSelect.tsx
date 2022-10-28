import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  name: string;
  defaultText: string;
  optionsList: string[];
  selectStyles: string;
  value: string;
  handleChange: Dispatch<SetStateAction<string>>;
}

const FormSelect: FC<Props> = ({
  name,
  defaultText,
  optionsList,
  selectStyles,
  value,
  handleChange,
}) => {
  return (
    <div className={selectStyles}>
      <label htmlFor={name}>{defaultText}</label>
      <select
        name={name}
        id={name}
        className="p-5 bg-transparent"
        value={value}
        onChange={e => handleChange(e.target.value)}>
        <option value="" disabled selected>
          {defaultText}
        </option>
        {optionsList.map(option => (
          <option
            key={option}
            value={option.toLocaleLowerCase().replace(/\s/, "-")}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelect;
