import { Combobox } from "@headlessui/react";
import { FC } from "react";

interface Props {
  suggestion: any;
  comboboxOptionStyles: string;
  handleClick: any;
}

const ComboboxOption: FC<Props> = ({
  suggestion,
  comboboxOptionStyles,
  handleClick,
}) => {
  return (
    <Combobox.Option
      as="li"
      value={suggestion}
      className={comboboxOptionStyles}
      onClick={handleClick}>
      {suggestion.place_name}
    </Combobox.Option>
  );
};

export default ComboboxOption;
