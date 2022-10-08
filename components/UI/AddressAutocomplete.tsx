import React, { Dispatch, FC, SetStateAction } from "react";
import { Combobox } from "@headlessui/react";
import useAddressAutocomplete from "../../hooks/useAddressAutocomplete";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import { useInView } from "react-intersection-observer";
import { Address, User } from "../../types/typings";

interface Props {
  displayFullAddress: boolean;
  selectedAddress: Address | null;
  setSelectedAddress: Dispatch<SetStateAction<Address | null>>;
}

const AddressAutocomplete: FC<Props> = ({
  displayFullAddress,
  selectedAddress,
  setSelectedAddress,
}) => {
  const user = useSelector(selectUser) as User;

  const { value, handleAddressChange, suggestions } =
    useAddressAutocomplete("");

  const [optionsRef, optionsInView] = useInView({
    threshold: 1,
    rootMargin: "70px",
  });

  return (
    <Combobox
      as="div"
      value={selectedAddress}
      onChange={setSelectedAddress}
      className="relative w-full">
      <Combobox.Label className="hidden" as="label">
        Email
      </Combobox.Label>
      <Combobox.Input
        as="input"
        value={value}
        onChange={handleAddressChange}
        displayValue={(suggestion: any) => {
          if (displayFullAddress) return suggestion?.place_name || "";
          else if (user) return user.streetAddress as string;
          return suggestion?.place_name.split(",")[0] || "";
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
            onClick={() =>
              setSelectedAddress({
                id: suggestion.id,
                placeName: suggestion?.place_name,
                coordinates: suggestion?.geometry.coordinates,
              })
            }
            className="cursor-pointer p-2 rounded hover:bg-gray-200">
            {suggestion?.place_name}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
};

export default AddressAutocomplete;
