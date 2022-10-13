import nc from "next-connect";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../lib/mongodb";

export default nc<NextApiRequest, NextApiResponse>()
  // Get a tour by id - GET /api/tours/:tour_id
  .get(async (req, res) => {
    const { db } = await connectToDatabase();
    const { tour_id } = req.query;

    try {
      const tour = await db.collection("tours").findOne({
        _id: new ObjectId(tour_id as string),
      });

      res.status(200).json(tour);
    } catch (error) {
      console.error(error);
    }
  })
  .put(async (req, res) => {
    // Update a tour by id - PUT /api/tours/:tour_id
    const { tour_id } = req.query;
    req.body.guideId = new ObjectId(req.body.guideId);

    try {
      const { db } = await connectToDatabase();
      await db.collection("tours").findOneAndUpdate(
        {
          _id: new ObjectId(tour_id as string),
        },
        {
          $set: {
            ...req.body,
          },
        }
      );

      const updatedTour = db.collection("tours").findOne({
        _id: new ObjectId(tour_id as string),
      });

      res.status(200).json(updatedTour);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  })
  .delete(async (req, res) => {
    // Delete a tour by id - DELETE /api/tours/:tour_id
    const { tour_id } = req.query;

    try {
      const { db } = await connectToDatabase();
      await db.collection("tours").findOneAndDelete({
        _id: new ObjectId(tour_id as string),
      });

      res.status(200).json({ message: "Tour deleted" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error", error });
    }
  });
