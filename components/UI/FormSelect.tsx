import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  name: string;
  defaultText: string;
  optionsList: string[];
  selectStyles: string;
  value: string;
  handleChange: Dispatch<SetStateAction<string>>;
}

const FormSelect: FC<Props> = props => {
  const { name, defaultText, optionsList, selectStyles, value, handleChange } =
    props;

  return (
    <div className={selectStyles}>
      <label htmlFor={name}>Select</label>
      <select
        name={name}
        id={name}
        className="p-5 bg-transparent"
        value={value}
        onChange={e => handleChange(e.target.value)}>
        <option value={defaultText} disabled selected>
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
