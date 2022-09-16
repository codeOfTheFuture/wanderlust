import React, { ChangeEvent, FC, useState } from "react";
import { useSelector } from "react-redux";
import useAddressAutocomplete from "../../hooks/useAddressAutocomplete";
import { selectUser } from "../../slices/userSlice";
import AddressAutocomplete from "../ui/AddressAutocomplete";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import FormInput from "../ui/FormInput";
import ProfilePhotoPicker from "./ProfilePhotoPicker";

const SettingsForm: FC = () => {
  const user = useSelector(selectUser);

  const [profileImage, setProfileImage] = useState<string>(""),
    [selectedAddress, setSelectedAddress] = useState(""),
    [phoneNumber, setPhoneNumber] = useState<string>(""),
    [registerAsGuide, setRegisterAsGuide] = useState<boolean>(false);

  console.log("selected address >>>", selectedAddress);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 xl:w-3/4 max-w-5xl h-11/12 sm:h-5/6 z-10 bg-white rounded-xl mx-2 p-2 sm:p-8 lg:p-14">
      {/* Edit Profile Photo */}
      <div className="col-span-1 lg:col-span-2 flex flex-col gap-2 md:gap-6 justify-center items-center w-full h-full">
        <h2 className="text-lg font-semibold text-primary-color">
          Profile photo
        </h2>
        <ProfilePhotoPicker />
      </div>

      {/* Edit Profile Info */}
      <div className="col-span-1 lg:col-span-3 flex flex-col justify-evenly items-center gap-2 sm:gap-5 w-full h-full p-2 lg:p-10">
        <h1 className="text-xl font-semibold text-primary-color">
          Edit Your Information
        </h1>

        <form className="flex flex-col w-full gap-4">
          <div>
            <label htmlFor="email" hidden>
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="Email"
              className="form-input"
            />
          </div>

          <AddressAutocomplete
            selectedAddress={selectedAddress}
            setSelectedAddress={setSelectedAddress}
          />

          <div className="flex flex-row justify-center items-center gap-2">
            <div className="w-full sm:w-6/12">
              <label htmlFor="city" hidden>
                City
              </label>
              <input
                id="city"
                type="text"
                placeholder="City"
                className="form-input"
              />
            </div>

            <div className="w-full sm:w-2/12">
              <label htmlFor="state" hidden>
                State
              </label>
              <input
                id="state"
                type="text"
                placeholder="State"
                className="form-input"
              />
            </div>

            <div className="w-full sm:w-4/12">
              <label htmlFor="zipCode" hidden>
                Zip
              </label>
              <input
                id="zipCode"
                type="text"
                placeholder="Zip Code"
                className="form-input"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phoneNumber"></label>
            <input
              id="phoneNumber"
              type="text"
              placeholder="Phone Number"
              className="form-input"
            />
          </div>
        </form>

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
    </div>
  );
};

export default SettingsForm;
