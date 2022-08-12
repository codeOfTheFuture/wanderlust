import React, { FC } from "react";
import ProfilePhotoPicker from "./ProfilePhotoPicker";

const EditProfilePhoto: FC = () => {
  return (
    <div className="col-span-1 lg:col-span-2 flex flex-col gap-6 justify-center items-center w-full h-full">
      <h2 className="text-lg font-semibold text-primary-color">
        Profile photo
      </h2>
      <ProfilePhotoPicker />
    </div>
  );
};

export default EditProfilePhoto;
