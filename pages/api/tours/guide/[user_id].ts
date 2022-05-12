import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { connectToDatabase } from "../../../../middleware/database";

export default nc<NextApiRequest, NextApiResponse>()
  // Add a new tour to the guide's offered tours
  .post(async (req, res) => {
    const USER_ID: string = req.query.user_id as string;

    const tour = {
      ...req.body,
      booked_tourists: [],
    };

    try {
      const { db } = await connectToDatabase();

      const addedTour = await db
        .collection("tours")
        .insertOne({ guide_id: new ObjectId(USER_ID), ...tour });

      await db.collection("users").findOneAndUpdate(
        { _id: new ObjectId(USER_ID as string) },
        {
          $push: {
            offered_tours: { tour_id: addedTour.insertedId, ...tour },
          },
        }
      );

      const newTour = await db
        .collection("tours")
        .findOne({ _id: addedTour.insertedId });

      res.status(200).json(newTour);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
