import { UserIcon } from "@heroicons/react/solid";
import React, { useRef } from "react";

const ProfilePhotoPicker: React.FC = () => {
  const profilePhotoPicker = useRef<HTMLInputElement>(null);

  return (
    <div
      className="w-48 h-48 rounded-full border border-dotted border-gray-500 cursor-pointer shadow-md hover:bg-gray-100"
      onClick={() => profilePhotoPicker.current?.click()}
    >
      <div className="flex flex-col justify-center items-center w-full h-full rounded-full">
        <UserIcon className="w-20 h-20 text-gray-500" />
        <p className="text-gray-500">Upload an Image</p>
      </div>
      <input
        type="file"
        name="profilePhotoPicker"
        id="profilePhotoPicker"
        ref={profilePhotoPicker}
        hidden
      />
    </div>
  );
};

export default ProfilePhotoPicker;
