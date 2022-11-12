import { Combobox } from "@headlessui/react";
import { FC } from "react";

interface Props {
  value: string;
  comboboxInputStyles: string;
  placeholderText?: string;
  handleAddressChange: (
    event: React.ChangeEvent<HTMLInputElement>
  ) => Promise<void>;
  displayValue: (suggestion: any) => any;
}

const ComboboxInput: FC<Props> = ({
  value,
  comboboxInputStyles,
  placeholderText,
  handleAddressChange,
  displayValue,
}) => {
  return (
    <Combobox.Input
      as="input"
      value={value}
      required
      onChange={handleAddressChange}
      displayValue={displayValue}
      className={comboboxInputStyles}
      placeholder={placeholderText}></Combobox.Input>
  );
};

export default ComboboxInput;
