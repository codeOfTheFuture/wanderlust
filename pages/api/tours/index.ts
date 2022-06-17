import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connectMongo";
import Tours from "../../../models/tourModel";
import { Tour } from "../../../types/types";

// Get all tours - GET /api/tours
export const getAllTours = async (): Promise<Tour[]> => {
  try {
    return await Tours.find({});
  } catch (error: any) {
    return error;
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      try {
        const tours: Tour[] = await getAllTours();

        res.status(200).json(tours);
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default connectMongo(handler);
