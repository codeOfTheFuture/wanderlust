import React, { FC } from "react";

interface Props {
  label: string;
  className: string;
  size: "btn-sm" | "btn-md" | "btn-lg";
  type: "submit" | "button";
  disabled?: boolean;
  onClick?: () => void;
}

const Button: FC<Props> = props => {
  const { label, className, size, type, disabled, onClick } = props;

  return (
    <button
      className={`${className} ${size}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};

export default Button;
