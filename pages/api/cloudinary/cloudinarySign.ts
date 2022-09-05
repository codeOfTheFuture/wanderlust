import cloudinary from "cloudinary";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";

const CLOUDINARY_V2 = cloudinary.v2;
const CLOUDINARY_SECRET = process.env.CLOUDINARY_SECRET as string;

const cloudinarySign = async (req: NextApiRequest, res: NextApiResponse) => {
  // TODO Check to make sure authenticated

  const timestamp = Math.round(new Date().getTime() / 1000);

  const signature = CLOUDINARY_V2.utils.api_sign_request(
    {
      timestamp: timestamp,
    },
    CLOUDINARY_SECRET
  );

  res.statusCode = 200;
  res.json({ signature, timestamp });
};

export default cloudinarySign;
