import React, { FC } from "react";
import Button from "../Button";
import FormInput from "../FormInput";

const EditProfileInfo: FC = () => {
  return (
    <div className="col-span-3 flex flex-col justify-evenly items-center w-full h-full p-10">
      <h1 className="text-xl font-semibold text-blue-400">
        Edit Your Information
      </h1>
      <div className="w-full">
        <FormInput name="email" label="Email" type="email" />
        <FormInput name="address" label="Address" type="text" />
        <FormInput name="phoneNumber" label="Phone Number" type="text" />
      </div>
      <div className="flex justify-between items-center w-full">
        <span>Register as guide</span>
        <FormInput name="" label="" type="checkbox" />
      </div>
      <Button
        label="Save"
        type="submit"
        className="bg-blue-400 text-lg font-semibold text-white py-3 rounded-lg hover:bg-blue-600"
        size="btn-lg"
      />
    </div>
  );
};

export default EditProfileInfo;
