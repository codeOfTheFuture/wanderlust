import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { connectToDatabase } from "../../../../../lib/mongodb";
import { User } from "../../../../../types/typings";

export default nextConnect<NextApiRequest, NextApiResponse>().put(
  async (req, res) => {
    const user_id = req.query.user_id as string;
    const tour_id = req.body as string;

    try {
      const { db } = await connectToDatabase();

      const { value } = await db.collection("users").findOneAndUpdate(
        { _id: new ObjectId(user_id) },
        {
          $pull: {
            favoriteTours: JSON.parse(
              JSON.stringify({
                _id: tour_id,
              })
            ),
          },
        },
        {
          returnDocument: "after",
        }
      );

      if (!value) {
        res.status(400).json({ message: "Something went wrong" });
      }

      res.status(200).json(value);
    } catch (error) {
      res.status(500);
      console.error(error);
    }
  }
);
