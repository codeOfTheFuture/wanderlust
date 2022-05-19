import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { connectToDatabase } from "../../../../../middleware/database";
import { Tour } from "../../../../../types/types";

export default nc<NextApiRequest, NextApiResponse>()
  // - POST /api/users/[user_id]/tours
  // Add a new tour to the guide's offered tours
  .post(async (req, res) => {
    const USER_ID: string = req.query.user_id as string;

    const tour: Tour = {
      guide_id: new ObjectId(USER_ID),
      booked_tourists: [],
      tour_date: new Date("2022-08-01"),
      created_at: new Date(),
      ...req.body,
    };
    const { booked_tourists } = tour;

    try {
      const { db } = await connectToDatabase();

      // Add the tour to the tours collection
      const addedTour = await db.collection("tours").insertOne(tour);

      // Update the guide's offered tours with the new tour
      await db.collection("users").findOneAndUpdate(
        { _id: new ObjectId(USER_ID) },
        {
          $push: {
            offered_tours: {
              _id: addedTour.insertedId,
              booked_tourists,
              ...req.body,
            },
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
