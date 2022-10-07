import React, {
  ComponentType,
  Dispatch,
  FC,
  InputHTMLAttributes,
  SetStateAction,
  SVGProps,
} from "react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  type: "text" | "email" | "number" | "password";
  value: string | number;
  Icon?: ComponentType<SVGProps<SVGSVGElement>>;
  handleFocus?: () => void;
  handleChange: Dispatch<SetStateAction<string>>;
}

const FormInput: FC<Props> = ({
  name,
  label,
  type,
  value,
  Icon,
  handleChange,
  handleFocus,
  ...rest
}) => {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} hidden>
        {label}
      </label>
      <div className="flex relative items-center">
        <input
          className="p-2 w-full border border-black rounded-md"
          id={name}
          placeholder={label}
          type={type}
          value={value}
          onChange={e => handleChange(e.target.value)}
          onFocus={handleFocus}
          {...rest}
        />
        {Icon && (
          <Icon
            className="absolute right-0 w-6 mx-2 cursor-pointer hover:text-primary-color"
            onClick={handleFocus}
          />
        )}
      </div>
    </div>
  );
};

export default FormInput;
