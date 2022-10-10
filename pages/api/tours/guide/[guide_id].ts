import { ObjectId } from "mongodb";
import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../lib/mongodb";

export default nc<NextApiRequest, NextApiResponse>()
  // Get tours for a single guide  - GET /api/tours/:user_id
  .get(async (req, res) => {
    const user_id = req.query.user_id as string;

    try {
      const { db } = await connectToDatabase();
      const tours = await db
        .collection("tours")
        .find({
          guideId: new ObjectId(user_id),
        })
        .toArray();

      res.status(200).json(tours);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
