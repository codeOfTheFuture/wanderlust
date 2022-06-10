import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../../../utils/connectMongo";
import Tours from "../../../../../models/tourModel";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const updatedTour = await Tours.findOneAndUpdate(
        { _id: new ObjectId(req.query.tour_id as string) },
        {
          $push: {
            tour_reviews: {
              user_id: new ObjectId(req.query.user_id as string),
              ...req.body,
            },
          },
        }
      );
      res.status(200).json(updatedTour);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default connectMongo(handler);
