import React, { ChangeEvent, FC, useState } from "react";
import { useSelector } from "react-redux";
import useParseAddress from "../../hooks/useParseAddress";
import { selectUser } from "../../slices/userSlice";
import AddressAutocomplete from "../ui/AddressAutocomplete";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import FormInput from "../ui/FormInput";
import ProfilePhotoPicker from "./ProfilePhotoPicker";
import CurrencyFormat from "react-currency-format";

const SettingsForm: FC = () => {
  const user = useSelector(selectUser);

  const [profileImage, setProfileImage] = useState<string>(""),
    [email, setEmail] = useState<string>(user?.email!),
    [selectedAddress, setSelectedAddress] = useState<any>(null),
    [phoneNumber, setPhoneNumber] = useState<string>(""),
    [registerAsGuide, setRegisterAsGuide] = useState<boolean>(false);

  const {
    streetAddress,
    city,
    state,
    zipCode,
    setStreetAddress,
    setCity,
    setState,
    setZipCode,
  } = useParseAddress(selectedAddress?.place_name || "");

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
              value={email}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
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
                value={city}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setCity(event.target.value)
                }
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
                value={state}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setState(event.target.value)
                }
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
                value={zipCode}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  setZipCode(event.target.value)
                }
                placeholder="Zip Code"
                className="form-input"
              />
            </div>
          </div>

          <div>
            <label htmlFor="phoneNumber"></label>
            <CurrencyFormat
              value={phoneNumber}
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                setPhoneNumber(event.target.value)
              }
              format="+1 (###) ###-####"
              mask="_"
              className="form-input"
            />
            {/* <input
              id="phoneNumber"
              type="text"
              placeholder="Phone Number"
              className="form-input"
            /> */}
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
