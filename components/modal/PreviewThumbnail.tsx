import React, { FC } from "react";
import { CloudinaryImage } from "../../types/typings";
import Image from "next/image";

interface Props {
  uploadedFile: CloudinaryImage;
  removeImage: (public_id: string, signature: string) => void;
}

const PreviewThumbnail: FC<Props> = ({ uploadedFile, removeImage }) => {
  const { public_id, signature, secure_url, original_filename } = uploadedFile;

  return (
    <div
      className="relative p-1 border rounded group"
      onClick={async () => await removeImage(public_id, signature)}>
      <button className="absolute top-0 left-0 w-full h-full text-lg font-bold text-error-dark-color opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-20 underline">
        Remove
      </button>
      <div className="w-28 h-28 relative rounded shadow-md group-hover:opacity-20 transition-opacity duration-300 ease-in-out">
        <Image
          src={secure_url}
          alt={original_filename}
          layout="fill"
          className="object-cover object-center rounded"
        />
      </div>
    </div>
  );
};

export default PreviewThumbnail;
