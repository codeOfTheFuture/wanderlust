import React, {
  Dispatch,
  FC,
  FocusEventHandler,
  InputHTMLAttributes,
  SetStateAction,
} from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type: "text" | "email" | "number" | "password";
  value: string;
  openCalender?: any;
  handleChange: Dispatch<SetStateAction<string>>;
}

const FormInput: FC<Props> = ({
  name,
  label,
  type,
  value,
  openCalender,
  handleChange,
  ...rest
}) => {
  console.log(openCalender);
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} hidden>
        {label}
      </label>
      <input
        className="p-2 w-full border border-black rounded-md"
        id={name}
        placeholder={label}
        type={type}
        value={value}
        onChange={e => handleChange(e.target.value)}
        onFocus={openCalender}
        {...rest}
      />
    </div>
  );
};

export default FormInput;
