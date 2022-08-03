import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../lib/mongodb";

// Get a tour by id - GET /api/tours/:id
const getSingleTourById = async (req: NextApiRequest, res: NextApiResponse) => {
  const { db } = await connectToDatabase();
  const { id } = req.query;

  try {
    const tour = await db
      .collection("tours")
      .findOne({ _id: new ObjectId(id as string) });

    res.status(200).json(tour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

export default getSingleTourById;
