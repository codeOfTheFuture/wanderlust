import React, { FC, FormEvent, useState } from "react";
import AddressAutocomplete from "../ui/AddressAutocomplete";
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

interface Props {
  // TODO: FORM DATA TYPING
  submitForm: (formData: any) => void;
}

const SettingsForm: FC<Props> = ({ submitForm }) => {
  const user = useAppSelector(selectUser) as User;

  const [email, setEmail] = useState<string>(user?.email || ""),
    [name, setName] = useState(user?.name || ""),
    [selectedSuggestion, setSelectedSuggestion] =
      useState<AddressSuggestion | null>(null),
    [streetAddress, setStreetAddress] = useState<string>(
      user?.streetAddress || ""
    ),
    [city, setCity] = useState<string>(user?.city || ""),
    [state, setState] = useState<string>(user?.state || ""),
    [zipCode, setZipCode] = useState<string>(user?.zipCode || ""),
    [phoneNumber, setPhoneNumber] = useState<string>(user?.phoneNumber || ""),
    [registerAsGuide, setRegisterAsGuide] = useState<boolean>(
      user?.registerAsGuide || false
    ),
    [profileImage, setProfileImage] = useState<CloudinaryImage | null>(null);

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

  const selectSuggestion = (suggestion: AddressSuggestion) => {
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

          <AddressAutocomplete
            selectedSuggestion={selectedSuggestion}
            setSelectedSuggestion={setSelectedSuggestion}
            selectSuggestion={selectSuggestion}
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
