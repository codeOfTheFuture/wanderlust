import nextConnect from "next-connect";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../../lib/mongodb";

export default nextConnect<NextApiRequest, NextApiResponse>().put(
  "/api/users/:user_id/unbooktour/:tour_id",
  async (req, res) => {
    const user_id = req.query.user_id as string,
      tour_id = req.query.tour_id as string;

    try {
      const { db } = await connectToDatabase();

      await db.collection("tours").findOneAndUpdate(
        { _id: new ObjectId(tour_id) },
        {
          $pull: {
            bookedTourists: JSON.parse(
              JSON.stringify({
                tourist_id: new ObjectId(user_id),
              })
            ),
          },
        }
      );

      const { value } = await db.collection("users").findOneAndUpdate(
        { _id: new ObjectId(user_id) },
        {
          $pull: {
            bookedTours: JSON.parse(
              JSON.stringify({
                _id: new ObjectId(tour_id),
              })
            ),
          },
        },
        {
          returnDocument: "after",
        }
      );

      res.status(200).json(value);
    } catch (error) {
      console.error(error);
    }
  }
);
