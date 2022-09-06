import React, {
  Dispatch,
  FC,
  InputHTMLAttributes,
  SetStateAction,
} from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type: "text" | "email" | "number" | "password";
  value: string;
  handleChange: Dispatch<SetStateAction<string>>;
}

const FormInput: FC<Props> = ({
  name,
  label,
  type,
  value,
  handleChange,
  ...rest
}) => {
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
        {...rest}
      />
    </div>
  );
};

export default FormInput;
