import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { connectToDatabase } from "../../../middleware/database";

export default nc<NextApiRequest, NextApiResponse>()
  // Get a single tour
  .get(async (req, res) => {
    try {
      const { db } = await connectToDatabase();
      const tour = await db
        .collection("tours")
        .findOne({ _id: new ObjectId(req.query.tour_id as string) });
      res.status(200).json(tour);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  })
  // Update an existing tour
  .put(async (req, res) => {
    try {
      const { db } = await connectToDatabase();
      await db.collection("tours").findOneAndUpdate(
        { _id: new ObjectId(req.query.tour_id as string) },
        {
          $set: {
            ...req.body,
          },
        },
        { returnOriginal: false }
      );

      const updatedTour = await db.collection("tours").findOne({
        _id: new ObjectId(req.query.tour_id as string),
      });

      res.status(200).json(updatedTour);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  })
  // Delete an existing tour
  .delete(async (req, res) => {
    try {
      const { db } = await connectToDatabase();
      await db.collection("tours").deleteOne({
        _id: new ObjectId(req.query.tour_id as string),
      });
      res.status(200).json({ message: "Tour deleted" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
