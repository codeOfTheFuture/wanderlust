import React, { FC } from "react";
import { useDropzone } from "react-dropzone";
import { CloudUploadIcon } from "@heroicons/react/outline";
import useOnDrop from "../../hooks/useOnDrop";

const DropZone: FC = () => {
  const { uploadedFiles, onDrop } = useOnDrop();

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
