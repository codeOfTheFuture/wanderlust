import React, { FC, RefObject } from "react";
import { UserIcon } from "@heroicons/react/solid";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";
import Image from "next/image";

interface Props {
  photoPickerRef: RefObject<HTMLInputElement>;
}

const ProfilePhotoPicker: FC<Props> = ({ photoPickerRef }) => {
  const user = useSelector(selectUser);

  return (
    <div
      className="w-20 h-20 sm:w-36 sm:h-36 lg:w-48 lg:h-48 rounded-full border border-dotted border-divider-color cursor-pointer shadow-md hover:bg-gray-100"
      onClick={() => photoPickerRef.current?.click()}>
      <div className="flex flex-col justify-center items-center w-full h-full rounded-full">
        {user ? (
          <div className="w-full h-full relative flex justify-center items-center rounded-full">
            <Image
              src={
                photoPickerRef.current?.value
                  ? photoPickerRef.current.value
                  : user.image
              }
              alt={(user.name, "profile image")}
              layout="fill"
              className="object-cover object-center rounded-full"
            />
          </div>
        ) : (
          <>
            <UserIcon className="w-8 h-8 lg:w-20 lg:h-20 text-gray-500" />
            <p className="text-gray-500 hidden sm:block">Upload an Image</p>
          </>
        )}
      </div>
      <input
        type="file"
        name="profilePhotoPicker"
        id="profilePhotoPicker"
        ref={photoPickerRef}
        hidden
      />
    </div>
  );
};

export default ProfilePhotoPicker;
