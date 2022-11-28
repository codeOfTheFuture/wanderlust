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
      <select
        name={name}
        id={name}
        className="bg-transparent focus:border-none rounded-lg block w-full p-3 text-xl text-black border border-gray-500 focus:outline-primary-color peer appearance-none"
        value={value}
        required
        onChange={e => handleChange(e.target.value)}>
        <option value="" disabled selected>
          {/* {defaultText} */}
        </option>
        {optionsList.map(option => (
          <option
            key={option}
            value={option.toLocaleLowerCase().replace(/\s/, "-")}>
            {option}
          </option>
        ))}
      </select>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="w-6 h-6 absolute top-4 right-3 text-gray-500">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
        />
      </svg>
      <label
        htmlFor={name}
        className="absolute top-4 left-1 px-2 text-lg leading-none min-w-[5px] pointer-events-none text-gray-500 transition-all duration-200 rounded-lg peer-focus:-translate-y-[1.6rem] peer-focus:text-sm peer-focus:translate-x-3 peer-focus:bg-white peer-focus:text-primary-color peer-valid:-translate-y-[1.6rem] peer-valid:text-sm peer-valid:translate-x-3 peer-valid:bg-white">
        {defaultText}
      </label>
    </div>
  );
};

export default FormSelect;
