import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../lib/mongodb";

// Get all tours - GET /api/tours
const getAllTours = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();

  try {
    const tours = await db.collection("tours").find({}).toArray();

    res.status(200).json(tours);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export default getAllTours;
