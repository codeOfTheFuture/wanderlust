import React, { FC, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUploadIcon } from "@heroicons/react/outline";
import getSignature from "../../utils/getSignature";
import { CloudinaryImage } from "../../types/typings";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
  CLOUDINARY_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_KEY as string,
  URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const DropZone: FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<CloudinaryImage[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach(async acceptedFile => {
      const { signature, timestamp } = await getSignature();

      const formData = new FormData();
      formData.append("file", acceptedFile);
      formData.append("signature", signature);
      formData.append("timestamp", timestamp);
      formData.append("api_key", CLOUDINARY_KEY);

      const response = await fetch(URL, {
          method: "post",
          body: formData,
        }),
        data: CloudinaryImage = await response.json();

      setUploadedFiles(prevState => [...prevState, data]);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpeg"],
      "image/jpg": [".jpg"],
      "image/png": [".png"],
    },
    multiple: false,
  });

  console.log(uploadedFiles);

  return (
    <div
      {...getRootProps()}
      className={`flex flex-col gap-2 justify-center items-center border-4 rounded-xl w-full h-1/2 outline-none ${
        isDragActive
          ? "border-solid border-primary-dark-color text-primary-dark-color"
          : "border-dashed border-primary-color text-primary-color"
      }`}>
      <input {...getInputProps()} />
      <h2 className="text-lg font-semibold">Drag and Drop</h2>
      <CloudUploadIcon className="w-12 h-12" />
    </div>
  );
};

export default DropZone;
