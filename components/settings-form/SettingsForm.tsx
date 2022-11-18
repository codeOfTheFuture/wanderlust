import React, { FC, FormEvent, useState } from "react";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import FormInput from "../ui/FormInput";
import ProfilePhotoPicker from "./ProfilePhotoPicker";
import CurrencyFormat from "react-currency-format";
import { selectUser } from "../../store/slices/userSlice";
import { AddressSuggestion, CloudinaryImage, User } from "../../types/typings";
import { useAppSelector } from "../../store";
import { stateAbbrLookup } from "../../utils/stateAbbrLookup";
import useOnDrop from "../../hooks/useOnDrop";
import deleteImage from "../../utils/deleteImage";
import ComboboxContainer from "../ui/combobox/ComboboxContainer";
import ComboboxInput from "../ui/combobox/ComboboxInput";
import ComboboxLabel from "../ui/combobox/ComboboxLabel";
import ComboboxOptions from "../ui/combobox/ComboboxOptions";
import useAddressAutocomplete from "../../hooks/useAddressAutocomplete";
import ComboboxOption from "../ui/combobox/ComboboxOption";

interface FormData {
  email: string;
  name: string;
  streetAddress: string;
  city: string;
  state: string;
  zipCode: string;
  phoneNumber: string;
  registerAsGuide: boolean;
  image: CloudinaryImage | null;
}

interface Props {
  submitForm: (formData: FormData) => void;
}

const SettingsForm: FC<Props> = ({ submitForm }) => {
  const user = useAppSelector(selectUser) as User;

  const [email, setEmail] = useState<string>(user?.email || "");
  const [name, setName] = useState(user?.name || "");
  const [selectedSuggestion, setSelectedSuggestion] =
    useState<AddressSuggestion | null>(null);
  const [streetAddress, setStreetAddress] = useState<string>(
    user?.streetAddress || ""
  );
  const [city, setCity] = useState<string>(user?.city || "");
  const [state, setState] = useState<string>(user?.state || "");
  const [zipCode, setZipCode] = useState<string>(user?.zipCode || "");
  const [phoneNumber, setPhoneNumber] = useState<string>(
    user?.phoneNumber || ""
  );
  const [registerAsGuide, setRegisterAsGuide] = useState<boolean>(
    user?.registerAsGuide || false
  );
  const [profileImage, setProfileImage] = useState<CloudinaryImage | null>(
    null
  );

  const getStreetAddress = (placeName: string) => {
    if (placeName) return placeName.split(", ")[0];
  };

  const getCity = (placeName: string) => {
    if (placeName) return placeName.split(", ")[1];
  };

  const getState = (placeName: string) => {
    if (placeName) {
      const stateZip = placeName.split(", ")[2].split(" ");

      if (stateZip.length === 2) return stateAbbrLookup(stateZip[0]);
      return stateAbbrLookup([stateZip[0], stateZip[1]].join(" "));
    }
  };

  const getZipCode = (placeName: string) => {
    if (placeName) {
      const stateZip = placeName.split(", ")[2].split(" ");

      if (stateZip.length === 2) return stateZip[1];

      return stateZip[2];
    }
  };

  const autofillAddress = (suggestion: AddressSuggestion) => {
    setSelectedSuggestion(suggestion);
    setStreetAddress(getStreetAddress(suggestion.place_name) as string);
    setCity(getCity(suggestion.place_name) as string);
    setState(getState(suggestion.place_name) as string);
    setZipCode(getZipCode(suggestion.place_name) as string);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    submitForm({
      name,
      email,
      image: profileImage,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      registerAsGuide,
    });
  };

  const [onDrop] = useOnDrop(async cloudinaryImage => {
    if (profileImage != null) {
      await deleteImage(profileImage.public_id, profileImage.signature);
      setProfileImage(cloudinaryImage);
    }
    setProfileImage(cloudinaryImage);
  });

  const { value, handleAddressChange, suggestions } =
    useAddressAutocomplete("");

  return (
    <form
      className="grid grid-cols-1 lg:grid-cols-5 xl:w-3/4 max-w-5xl h-11/12 sm:h-5/6 z-10 bg-white rounded-xl mx-2 p-2 sm:p-8 lg:p-14"
      onSubmit={handleSubmit}>
      {/* Edit Profile Photo */}
      <div className="col-span-1 lg:col-span-2 flex flex-col gap-2 md:gap-6 justify-center items-center w-full h-full">
        <h2 className="text-lg font-semibold text-primary-color">
          Profile photo
        </h2>
        <ProfilePhotoPicker
          onDrop={onDrop}
          profileImage={profileImage?.secure_url as string}
        />
      </div>

      {/* Edit Profile Info */}
      <div className="col-span-1 lg:col-span-3 flex flex-col justify-evenly items-center gap-2 sm:gap-5 w-full h-full p-2 lg:p-10">
        <h1 className="text-xl font-semibold text-primary-color">
          Edit Your Information
        </h1>

        <div className="flex flex-col w-full gap-4">
          <FormInput
            name="name"
            label="Name"
            type="text"
            value={name}
            handleChange={setName}
          />

          <FormInput
            name="email"
            label="Email"
            type="email"
            value={email}
            handleChange={setEmail}
          />

          <ComboboxContainer
            selectedSuggestion={selectedSuggestion}
            setSelectedSuggestion={setSelectedSuggestion}
            comboboxStyles="form-control relative">
            <ComboboxInput
              value={value}
              handleAddressChange={handleAddressChange}
              comboboxInputStyles="form-input peer"
              displayValue={suggestion =>
                suggestion?.place_name.split(", ")[0] || user?.streetAddress
              }
            />
            <ComboboxLabel comboboxLabelStyles="form-label peer-focus:-translate-y-[1.6rem] peer-focus:text-sm peer-focus:translate-x-2 peer-focus:bg-white peer-focus:text-primary-color peer-valid:-translate-y-[1.6rem] peer-valid:text-sm peer-valid:translate-x-2 peer-valid:bg-white">
              Address
            </ComboboxLabel>
            <ComboboxOptions
              comboboxOptionsStyles={`${
                suggestions.length ? "flex" : "hidden"
              }  flex-col justify-center items-start absolute w-full bg-white rounded-md top-14 p-2 z-10 border border-gray-500`}>
              {suggestions.map(suggestion => (
                <ComboboxOption
                  key={suggestion.id}
                  suggestion={suggestion}
                  comboboxOptionStyles="cursor-pointer p-2 rounded hover:bg-primary-color hover:text-white hover:shadow-xl w-full"
                  handleClick={() => autofillAddress(suggestion)}
                />
              ))}
            </ComboboxOptions>
          </ComboboxContainer>

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
            onChange={e => setPhoneNumber(e.target.value)}
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
