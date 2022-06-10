import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../../../utils/connectMongo";
import Users from "../../../../../models/userModel";
import Tours from "../../../../../models/tourModel";
import { Tour } from "../../../../../types/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "PUT") {
    try {
      const tour = await Users.findOne({
        _id: new ObjectId(req.query.tour_id as string),
      });

      if (tour?.guide_id.toString() !== req.query.user_id) {
        res.status(401).json({ error: "Unauthorized" });
      }

      const updatedTour = await Tours.findOneAndUpdate(
        { _id: new ObjectId(req.query.tour_id as string) },
        {
          $set: {
            ...req.body,
          },
        }
      );

      const guide = await Users.findOne({
        _id: new ObjectId(updatedTour?.guide_id as string),
      });

      const offered_tours: Tour[] = guide?.offered_tours;

      const updated_offered_tours = offered_tours.map((tour: Tour) => {
        if (tour._id.toString() === req.query.tour_id) {
          tour = updatedTour;
          return tour;
        }
        return tour;
      });

      await Users.findOneAndUpdate(
        { _id: new ObjectId(guide?._id as string) },
        {
          $set: {
            offered_tours: updated_offered_tours,
          },
        }
      );

      res.status(200).json(updatedTour);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      const tour = await Tours.findOne({
        _id: new ObjectId(req.query.tour_id as string),
      });

      if (!tour) {
        res.status(404).json({ error: "Tour not found" });
      }

      if (tour?.guide_id.toString() !== req.query.user_id) {
        res.status(401).json({ error: "Unauthorized" });
      }

      await Tours.findOneAndDelete({
        _id: new ObjectId(req.query.tour_id as string),
      });

      const guide = await Users.findOne({
        _id: new ObjectId(req.query.user_id as string),
      });

      const updated_offered_tours = guide?.offered_tours.filter(
        (tour: Tour) => tour._id.toString() !== req.query.tour_id
      );

      await Users.findOneAndUpdate(
        { _id: new ObjectId(req.query.user_id as string) },
        {
          $set: {
            offered_tours: updated_offered_tours,
          },
        }
      );

      res.status(200).json({ message: "Tour deleted" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default connectMongo(handler);
