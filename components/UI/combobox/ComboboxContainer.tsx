import { Dispatch, FC, ReactNode, SetStateAction } from "react";
import { Combobox } from "@headlessui/react";
import { AddressSuggestion } from "../../../types/typings";

interface Props {
  children: ReactNode;
  selectedSuggestion: AddressSuggestion | null;
  setSelectedSuggestion: Dispatch<SetStateAction<AddressSuggestion | null>>;
  comboboxStyles: string;
}

const ComboboxContainer: FC<Props> = ({
  children,
  selectedSuggestion,
  setSelectedSuggestion,
  comboboxStyles,
}) => {
  return (
    <Combobox
      as="div"
      value={selectedSuggestion}
      onChange={setSelectedSuggestion}
      className={comboboxStyles}>
      {children}
    </Combobox>
  );
};

export default ComboboxContainer;
