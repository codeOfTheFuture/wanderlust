import React, { FC, useRef } from "react";
import { UserIcon } from "@heroicons/react/solid";

const ProfilePhotoPicker: FC = () => {
  const profilePhotoPicker = useRef<HTMLInputElement>(null);

  return (
    <div
      className="w-36 h-36 lg:w-48 lg:h-48 rounded-full border border-dotted border-divider-color cursor-pointer shadow-md hover:bg-gray-100"
      onClick={() => profilePhotoPicker.current?.click()}
    >
      <div className="flex flex-col justify-center items-center w-full h-full rounded-full">
        <UserIcon className="w-8 h-8 lg:w-20 lg:h-20 text-gray-500" />
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
