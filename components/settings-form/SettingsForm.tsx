import React, { ChangeEvent, FC, FormEvent, useRef, useState } from "react";
import useParseAddress from "../../hooks/useParseAddress";
import AddressAutocomplete from "../ui/AddressAutocomplete";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import FormInput from "../ui/FormInput";
import ProfilePhotoPicker from "./ProfilePhotoPicker";
import CurrencyFormat from "react-currency-format";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import { Address } from "../../types/typings";

interface Props {
  submitForm: (formData: any) => Promise<void>;
}

const SettingsForm: FC<Props> = ({ submitForm }) => {
  const user = useSelector(selectUser);

  const photoPickerRef = useRef<HTMLInputElement>(null);

  const [email, setEmail] = useState<string>(user?.email!),
    [selectedAddress, setSelectedAddress] = useState<Address | null>(null),
    [phoneNumber, setPhoneNumber] = useState<string>(user?.phoneNumber || ""),
    [registerAsGuide, setRegisterAsGuide] = useState<boolean>(
      user?.registerAsGuide || false
    );

  const { streetAddress, city, state, zipCode, setCity, setState, setZipCode } =
    useParseAddress(selectedAddress?.placeName || "");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await submitForm({
      email,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      registerAsGuide,
    });
  };

  return (
    <form
      className="grid grid-cols-1 lg:grid-cols-5 xl:w-3/4 max-w-5xl h-11/12 sm:h-5/6 z-10 bg-white rounded-xl mx-2 p-2 sm:p-8 lg:p-14"
      onSubmit={handleSubmit}>
      {/* Edit Profile Photo */}
      <div className="col-span-1 lg:col-span-2 flex flex-col gap-2 md:gap-6 justify-center items-center w-full h-full">
        <h2 className="text-lg font-semibold text-primary-color">
          Profile photo
        </h2>
        <ProfilePhotoPicker photoPickerRef={photoPickerRef} />
      </div>

      {/* Edit Profile Info */}
      <div className="col-span-1 lg:col-span-3 flex flex-col justify-evenly items-center gap-2 sm:gap-5 w-full h-full p-2 lg:p-10">
        <h1 className="text-xl font-semibold text-primary-color">
          Edit Your Information
        </h1>

        <div className="flex flex-col w-full gap-4">
          <FormInput
            name="email"
            label="Email"
            type="email"
            value={email}
            handleChange={setEmail}
          />

          <AddressAutocomplete
            displayFullAddress={false}
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />

          <div className="flex flex-row justify-center items-center gap-2">
            <div className="w-full sm:w-6/12">
              <FormInput
                name="city"
                label="City"
                type="text"
                value={city}
                handleChange={setCity}
              />
            </div>

            <div className="w-full sm:w-2/12">
              <FormInput
                name="state"
                label="State"
                type="text"
                value={state}
                handleChange={setState}
              />
            </div>

            <div className="w-full sm:w-4/12">
              <FormInput
                name="zip-code"
                label="Zip Code"
                type="text"
                value={zipCode}
                handleChange={setZipCode}
              />
            </div>
          </div>

          <CurrencyFormat
            customInput={FormInput}
            label="Phone Number"
            type="text"
            value={phoneNumber}
            onChange={(event: ChangeEvent<HTMLInputElement>) =>
              setPhoneNumber(event.target.value)
            }
            format="+1 (###) ###-####"
            mask="_"
          />
        </div>

        <div className="flex justify-between items-center w-full">
          <span className="font-semibold">Register as guide</span>
          <Checkbox
            checked={registerAsGuide}
            handleChange={setRegisterAsGuide}
          />
        </div>
        <Button color="btn-primary" size="btn-xl" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default SettingsForm;
