import React, { FC, useState } from "react";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import FormInput from "../ui/FormInput";
import ProfilePhotoPicker from "./ProfilePhotoPicker";

const SettingsForm: FC = () => {
  const [profileImage, setProfileImage] = useState<string>(""),
    [phoneNumber, setPhoneNumber] = useState<string>(""),
    [address, setAddress] = useState<string>("");

  return (
    <form className="grid grid-cols-1 lg:grid-cols-5 w-full lg:w-1/2 h-auto lg:h-3/4 z-10 bg-white rounded-xl p-8 mx-2 lg:mx-0 lg:p-14">
      {/* Edit Profile Photo */}
      <div className="col-span-1 lg:col-span-2 flex flex-col gap-6 justify-center items-center w-full h-full">
        <h2 className="text-lg font-semibold text-primary-color">
          Profile photo
        </h2>
        <ProfilePhotoPicker />
      </div>

      {/* Edit Profile Info */}
      <div className="col-span-1 lg:col-span-3 flex flex-col justify-evenly items-center w-full h-full p-2 lg:p-10">
        <h1 className="text-xl font-semibold text-primary-color">
          Edit Your Information
        </h1>

        <FormInput
          name="email"
          label="Email"
          type="email"
          value=""
          handleChange={() => {}}
        />
        <FormInput
          name="address"
          label="Address"
          type="text"
          value={address}
          handleChange={setAddress}
        />
        <FormInput
          name="phoneNumber"
          label="Phone Number"
          type="text"
          value={phoneNumber}
          handleChange={setPhoneNumber}
        />

        <div className="flex justify-between items-center w-full">
          <span>Register as guide</span>
          <Checkbox />
        </div>
        <Button color="btn-primary" size="btn-xl" type="submit">
          Save
        </Button>
      </div>
    </form>
  );
};

export default SettingsForm;
