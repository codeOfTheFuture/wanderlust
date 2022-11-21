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
    <div className="form-control">
      <input
        className="form-input peer"
        id={name}
        type={type}
        value={value}
        onChange={e => handleChange(e.target.value)}
        onFocus={handleFocus}
        required
        {...rest}
      />
      <label
        htmlFor={name}
        className="form-label peer-focus:-translate-y-[1.6rem] peer-focus:text-sm peer-focus:translate-x-2 peer-focus:bg-white peer-focus:text-primary-color peer-valid:-translate-y-[1.6rem] peer-valid:text-sm peer-valid:translate-x-2 peer-valid:bg-white">
        {label}
      </label>
      {Icon && (
        <Icon
          className="absolute right-0 w-6 mx-2 cursor-pointer hover:text-primary-color"
          onClick={handleFocus}
        />
      )}
    </div>
  );
};

export default FormInput;
