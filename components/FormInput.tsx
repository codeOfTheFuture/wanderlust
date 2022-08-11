import React, { FC, InputHTMLAttributes } from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type: "text" | "email" | "password";
}

const FormInput: FC<Props> = ({ name, label, ...rest }) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name}>{label}</label>
      <input className="p-2" id={name} {...rest} placeholder={label} />
    </div>
  );
};

export default FormInput;
