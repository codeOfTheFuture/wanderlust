import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connectMongo";
import Tours from "../../../models/tourModel";

// Get all tours - GET /api/tours
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const tours = await Tours.find({});
      res.status(200).json(tours);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default connectMongo(handler);
