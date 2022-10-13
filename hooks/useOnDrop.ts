import { useCallback, useState } from "react";
import { CloudinaryImage } from "../types/typings";
import getSignature from "../utils/getSignature";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME as string,
  CLOUDINARY_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_KEY as string,
  URL = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

const useOnDrop = (tourPhotos: CloudinaryImage[] | undefined) => {
  const [uploadedFiles, setUploadedFiles] = useState<CloudinaryImage[]>(
    tourPhotos || []
  );

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
  return { uploadedFiles, setUploadedFiles, onDrop };
};

export default useOnDrop;
