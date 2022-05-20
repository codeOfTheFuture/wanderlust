import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { connectToDatabase } from "../../../../middleware/database";

// Get a tour by id - GET /api/tours/:id
export default nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  const TOUR_ID: string = req.query.tour_id as string;
  try {
    const { db } = await connectToDatabase();
    const tour = await db
      .collection("tours")
      .findOne({ _id: new ObjectId(TOUR_ID) });

    res.status(200).json(tour);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
