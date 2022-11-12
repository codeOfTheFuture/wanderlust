import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import { useAppSelector } from "../../store";
import { selectSearchQuery } from "../../store/slices/searchSlice";
import { AddressSuggestion } from "../../types/typings";
import ComboboxContainer from "./combobox/ComboboxContainer";
import ComboboxInput from "./combobox/ComboboxInput";
import ComboboxOption from "./combobox/ComboboxOption";
import ComboboxOptions from "./combobox/ComboboxOptions";

interface Props {
  value: string;
  suggestions: any[];
  selectedSuggestion: AddressSuggestion | null;
  setSelectedSuggestion: Dispatch<SetStateAction<AddressSuggestion | null>>;
  handleAddressChange: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
  setZoomLevel: (placeType: string, category: string) => void;
  comboBoxStyles: string;
  comboboxInputStyles: string;
  comboboxOptionsStyles: string;
  comboboxOptionStyles: string;
}

const SearchInput: FC<Props> = ({
  value,
  suggestions,
  selectedSuggestion,
  setSelectedSuggestion,
  handleAddressChange,
  setZoomLevel,
  comboBoxStyles,
  comboboxInputStyles,
  comboboxOptionsStyles,
  comboboxOptionStyles,
}) => {
  const searchQuery = useAppSelector(selectSearchQuery) as string;

  return (
    <ComboboxContainer
      comboboxStyles={comboBoxStyles}
      selectedSuggestion={selectedSuggestion}
      setSelectedSuggestion={setSelectedSuggestion}>
      <ComboboxInput
        comboboxInputStyles={comboboxInputStyles}
        value={value}
        handleAddressChange={handleAddressChange}
        displayValue={suggestion => {
          if (searchQuery && !suggestion) return searchQuery;
          if (suggestion?.place_type[0] === "poi") {
            return suggestion?.text;
          }
          return suggestion?.place_name;
        }}
      />
      <button
        className="absolute top-2 right-2 flex justify-center items-center w-20 h-12 sm:w-32 sm:h-16 bg-primary-color text-light-text text-lg border border-primary-text cursor-pointer"
        type="submit">
        Search
      </button>

      <ComboboxOptions comboboxOptionsStyles={comboboxOptionsStyles}>
        {suggestions.map(suggestion => (
          <ComboboxOption
            key={suggestion.id}
            suggestion={suggestion}
            handleClick={() => {
              setSelectedSuggestion(suggestion);
              setZoomLevel(
                suggestion.place_type[0],
                suggestion.properties.category
              );
            }}
            comboboxOptionStyles={comboboxOptionStyles}
          />
        ))}
      </ComboboxOptions>
    </ComboboxContainer>
  );
};

export default SearchInput;
