import { Combobox } from "@headlessui/react";
import { useRouter } from "next/router";
import { FC, Fragment } from "react";

interface Props {
  selectedAddress: any;
  setSelectedAddress: any;
  value: any;
  handleAddressChange: any;
  defaultValue: any;
  suggestions: any;
  autofillAddress: any;
}

const AddressInput: FC<Props> = ({
  selectedAddress,
  setSelectedAddress,
  value,
  handleAddressChange,
  defaultValue,
  suggestions,
  autofillAddress,
}) => {
  const router = useRouter();

  return (
    <Combobox
      as="div"
      value={selectedAddress}
      onChange={autofillAddress ? autofillAddress : setSelectedAddress}
      className="form-control relative">
      <Combobox.Input
        as="input"
        className="form-input peer"
        value={value}
        onChange={handleAddressChange}
        displayValue={(suggestion: any) =>
          autofillAddress
            ? suggestion?.place_name.split(", ")[0] || defaultValue
            : suggestion?.place_name || defaultValue
        }
        required
      />
      <Combobox.Label
        as="label"
        className="form-label peer-focus:-translate-y-[1.6rem] peer-focus:text-sm peer-focus:translate-x-2 peer-focus:bg-white peer-focus:text-primary-color peer-valid:-translate-y-[1.6rem] peer-valid:text-sm peer-valid:translate-x-2 peer-valid:bg-white">
        Address
      </Combobox.Label>

      <Combobox.Options
        className={`${
          suggestions?.length ? "flex" : "hidden"
        } flex-col justify-center items-start absolute w-full bg-white border border-black rounded-md z-10 ${
          router.pathname === "/create-tour" ? "bottom-16" : "top-14"
        }`}>
        {suggestions?.map((suggestion: any) => (
          <Combobox.Option as={Fragment} value={suggestion} key={suggestion.id}>
            {({ active }) => (
              <li
                className={`
                ${active && "bg-primary-color text-white shadow-2xl"}
                cursor-pointer p-2 rounded w-full`}
                onClick={() => {
                  if (autofillAddress) {
                    autofillAddress(suggestion);
                  } else {
                    setSelectedAddress(suggestion);
                  }
                }}>
                {suggestion.place_name}
              </li>
            )}
          </Combobox.Option>
        ))}
      </Combobox.Options>
    </Combobox>
  );
};

export default AddressInput;
