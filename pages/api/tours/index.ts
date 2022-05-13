import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { connectToDatabase } from "../../../middleware/database";

// Get all tours - GET /api/tours
export default nc<NextApiRequest, NextApiResponse>().get(async (req, res) => {
  try {
    const { db } = await connectToDatabase();
    const tours = await db.collection("tours").find({}).toArray();

    res.status(200).json(tours);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
});
