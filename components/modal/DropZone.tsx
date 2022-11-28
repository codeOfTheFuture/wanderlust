import React, { FC } from "react";
import { DropzoneInputProps, DropzoneRootProps } from "react-dropzone";
import { CloudUploadIcon } from "@heroicons/react/outline";

interface Props {
  getRootProps: <T extends DropzoneRootProps>(props?: T | undefined) => any;
  getInputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
  isDragActive: boolean;
}

const DropZone: FC<Props> = ({ getRootProps, getInputProps, isDragActive }) => {
  return (
    <div
      {...getRootProps()}
      className={`hidden lg:flex flex-col gap-2 justify-center items-center border-4 rounded w-full h-1/2 outline-none ${
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
