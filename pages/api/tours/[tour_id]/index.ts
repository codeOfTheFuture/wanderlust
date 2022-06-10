import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../../utils/connectMongo";
import Tours from "../../../../models/tourModel";

// Get a tour by id - GET /api/tours/:id
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const tour = await Tours.findOne({
        _id: new ObjectId(req.query.tour_id as string),
      });
      res.status(200).json(tour);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default connectMongo(handler);
