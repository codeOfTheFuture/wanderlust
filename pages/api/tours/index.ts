import { ObjectId } from "mongodb";
import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";

export default nc<NextApiRequest, NextApiResponse>()
  // Get all tours - GET /api/tours
  .get(async (req, res) => {
    try {
      const { db } = await connectToDatabase();
      const tours = await db.collection("tours").find({}).toArray();

      res.status(200).json(tours);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  })
  // Add a new tour - POST /api/tours
  .post(async (req, res) => {
    req.body.guideId = new ObjectId(req.body.guideId);

    try {
      const { db } = await connectToDatabase();
      const newTour = await db.collection("tours").insertOne({
        ...req.body,
      });
      res.status(201).json(newTour);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  });
