import React, { Dispatch, FC, SetStateAction } from "react";
import { Combobox } from "@headlessui/react";
import useAddressAutocomplete from "../../hooks/useAddressAutocomplete";
import { selectUser } from "../../store/slices/userSlice";
import { useInView } from "react-intersection-observer";
import { AddressSuggestion, User } from "../../types/typings";
import { useRouter } from "next/router";
import { useAppSelector } from "../../store";

interface Props {
  tourPlaceName?: string;
  selectedSuggestion: AddressSuggestion | null;
  setSelectedSuggestion: Dispatch<SetStateAction<AddressSuggestion | null>>;
  selectSuggestion: (suggestion: AddressSuggestion) => void;
}

const AddressAutocomplete: FC<Props> = ({
  tourPlaceName,
  selectedSuggestion,
  setSelectedSuggestion,
  selectSuggestion,
}) => {
  console.log("selected address>>>>", selectedSuggestion);
  const user = useAppSelector(selectUser) as User;

  const router = useRouter();

  const { value, handleAddressChange, suggestions } =
    useAddressAutocomplete("");

  const [optionsRef, optionsInView] = useInView({
    threshold: 1,
    rootMargin: "70px",
  });

  return (
    <Combobox
      as="div"
      value={selectedSuggestion}
      onChange={setSelectedSuggestion}
      className="relative w-full">
      <Combobox.Label className="hidden" as="label">
        Email
      </Combobox.Label>
      <Combobox.Input
        as="input"
        value={value}
        onChange={handleAddressChange}
        displayValue={(suggestion: any) => {
          if (router.pathname === "/settings") {
            return suggestion?.place_name.split(", ")[0] || user?.streetAddress;
          } else {
            return suggestion?.place_name || tourPlaceName;
          }
        }}
        className="form-input"
        placeholder="Address"
      />
      <Combobox.Options
        as="ul"
        className={`flex-col justify-center items-start absolute w-full bg-white border border-black rounded-md ${
          suggestions.length ? "flex" : "hidden"
        } ${optionsInView ? "-top-52 mt-1" : "mt-1"}`}
        ref={optionsRef}>
        {suggestions.map(suggestion => (
          <Combobox.Option
            as="li"
            key={suggestion.id}
            value={suggestion}
            onClick={() => selectSuggestion(suggestion)}
            className="cursor-pointer p-2 rounded hover:bg-gray-200">
            {suggestion?.place_name}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
};

export default AddressAutocomplete;
