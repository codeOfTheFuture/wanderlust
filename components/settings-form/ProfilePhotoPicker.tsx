import React, { FC } from "react";
import { UserIcon } from "@heroicons/react/solid";
import { selectUser } from "../../store/slices/userSlice";
import Image from "next/image";
import { useAppSelector } from "../../store";
import { useDropzone } from "react-dropzone";

interface Props {
  profileImage: string;
  onDrop: (acceptedFiles: File[]) => void;
}

const ProfilePhotoPicker: FC<Props> = ({ profileImage, onDrop }) => {
  const user = useAppSelector(selectUser);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="w-20 h-20 sm:w-36 sm:h-36 lg:w-48 lg:h-48 rounded-full border border-dotted border-divider-color cursor-pointer shadow-md hover:bg-gray-100"
      onClick={open}>
      <div className="flex flex-col justify-center items-center w-full h-full rounded-full">
        {user?.profileImage || (user && profileImage) ? (
          <div className="w-full h-full relative flex justify-center items-center rounded-full bg-white">
            <Image
              src={profileImage || user.profileImage.secure_url}
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
        {...getInputProps()}
        type="file"
        name="profilePhotoPicker"
        id="profilePhotoPicker"
        hidden
      />
    </div>
  );
};

export default ProfilePhotoPicker;
