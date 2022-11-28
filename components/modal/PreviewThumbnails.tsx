import React, { FC } from "react";
import { CloudinaryImage } from "../../types/typings";
import PreviewThumbnail from "./PreviewThumbnail";

interface Props {
  uploadedFiles: CloudinaryImage[];
  removeImage: (public_id: string, signature: string) => Promise<void>;
}

const PreviewThumbnails: FC<Props> = ({ uploadedFiles, removeImage }) => {
  return !uploadedFiles.length ? (
    <div className="flex justify-center items-center h-32">
      <span className="text-lg font-medium text-gray-800">
        No images selected
      </span>
    </div>
  ) : (
    <div className="flex justify-start items-center gap-2 w-full h-32">
      {uploadedFiles.map(uploadedFile => (
        <PreviewThumbnail
          key={uploadedFile.asset_id}
          uploadedFile={uploadedFile}
          removeImage={removeImage}
        />
      ))}
    </div>
  );
};

export default PreviewThumbnails;
