import { useCallback } from "react";
import toast from "react-hot-toast";
import { CloudinaryImage } from "../types/typings";
import getSignature from "../utils/getSignature";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
  CLOUDINARY_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_KEY as string,
  URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

type Callback = (data: CloudinaryImage) => void;

const useOnDrop = (cb: Callback) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach(async acceptedFile => {
        const { signature, timestamp } = await getSignature();

        const formData = new FormData();
        formData.append("file", acceptedFile);
        formData.append("signature", signature);
        formData.append("timestamp", timestamp);
        formData.append("api_key", CLOUDINARY_KEY);

        toast.loading("Uploading Image...");

        const response = await fetch(URL, {
          method: "POST",
          body: formData,
        });

        const data = (await response.json()) as CloudinaryImage;

        if (response.status === 200) {
          toast.dismiss();
          toast.success("Image Successfully Uploaded!");
        } else {
          toast.error("Error Uploading Image.");
        }

        cb(data);
      });
    },
    [cb]
  );

  return [onDrop];
};

export default useOnDrop;
