import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { connectToDatabase } from "../../../../../middleware/database";

export default nc<NextApiRequest, NextApiResponse>()
  // Leave a review for a tour
  .post(async (req, res) => {
    const TOUR_ID: string = req.query.tour_id as string;
    const USER_ID: string = req.query.user_id as string;

    try {
      // Connect to the database
      const { db } = await connectToDatabase();

      // Query the database for a tour and add the review to the tour
      const updatedTour = await db.collection("tours").findOneAndUpdate(
        { _id: new ObjectId(TOUR_ID) },
        {
          $push: {
            tour_reviews: {
              user_id: new ObjectId(USER_ID),
              ...req.body,
            },
          },
        }
      );
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
