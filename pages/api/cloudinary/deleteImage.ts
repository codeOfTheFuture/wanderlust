import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import cloudinary from "cloudinary";

const CLOUDINARY_V2 = cloudinary.v2;

const deleteImage = async (req: NextApiRequest, res: NextApiResponse) => {
  const { public_id } = req.headers;

  CLOUDINARY_V2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME as string,
    api_key: process.env.CLOUDINARY_KEY as string,
    api_secret: process.env.CLOUDINARY_SECRET as string,
  });

  try {
    await CLOUDINARY_V2.uploader.destroy(public_id as string);

    res.json({ success: true, message: "Image deleted" });
  } catch (error) {
    res.json({ message: "Error", error });
  }
};

export default deleteImage;
