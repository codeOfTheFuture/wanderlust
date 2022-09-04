import React, { FC } from "react";
import Button from "../ui/Button";
import Checkbox from "../ui/Checkbox";
import FormInput from "../ui/FormInput";

const EditProfileInfo: FC = () => {
  return (
    <div className="col-span-1 lg:col-span-3 flex flex-col justify-evenly items-center w-full h-full p-2 lg:p-10">
      <h1 className="text-xl font-semibold text-primary-color">
        Edit Your Information
      </h1>

      <FormInput name="email" label="Email" type="email" />
      <FormInput name="address" label="Address" type="text" />
      <FormInput name="phoneNumber" label="Phone Number" type="text" />

      <div className="flex justify-between items-center w-full">
        <span>Register as guide</span>
        <Checkbox />
      </div>
      <Button color="btn-primary" size="btn-xl" type="submit">
        Save
      </Button>
    </div>
  );
};

export default EditProfileInfo;