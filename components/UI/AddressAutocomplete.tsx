import React, { Dispatch, FC, SetStateAction } from "react";
import { Combobox } from "@headlessui/react";
import useAddressAutocomplete from "../../hooks/useAddressAutocomplete";

interface Props {
  selectedAddress: string;
  setSelectedAddress: Dispatch<SetStateAction<string>>;
}

const AddressAutocomplete: FC<Props> = ({
  selectedAddress,
  setSelectedAddress,
}) => {
  const { value, onChange, suggestions } = useAddressAutocomplete("");

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
        onChange={onChange}
        displayValue={(suggestion: any) =>
          suggestion && suggestion.place_name.split(",")[0]
        }
        className="form-input"
        placeholder="Address"
      />
      <Combobox.Options
        as="ul"
        className={`${
          suggestions.length ? "flex" : "hidden"
        } flex-col justify-center items-start absolute w-full mt-1 bg-white border border-black rounded-md`}>
        {suggestions.map(suggestion => (
          <Combobox.Option
            as="li"
            key={suggestion.id}
            value={suggestion}
            onClick={() => setSelectedAddress(suggestion.place_name)}
            className="cursor-pointer p-2 rounded hover:bg-gray-200">
            {suggestion.place_name}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
};

export default AddressAutocomplete;
