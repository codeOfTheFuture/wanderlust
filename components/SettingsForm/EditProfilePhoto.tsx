import React from "react";
import ProfilePhotoPicker from "./ProfilePhotoPicker";

const EditProfilePhoto: React.FC = () => {
  return (
    <div className="border border-red-500 col-span-2 flex flex-col gap-6 justify-center items-center w-full h-full">
      <h2 className="text-lg font-semibold text-blue-400">Profile photo</h2>
      <ProfilePhotoPicker />
    </div>
  );
};

export default EditProfilePhoto;
