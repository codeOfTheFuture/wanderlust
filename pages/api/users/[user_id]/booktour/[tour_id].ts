import nextConnect from "next-connect";
import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../../lib/mongodb";

export default nextConnect<NextApiRequest, NextApiResponse>().put(
  "/api/users/:user_id/booktour/:tour_id",
  async (req, res) => {
    const user_id = req.query.user_id as string,
      tour_id = req.query.tour_id as string;

    try {
      const { db } = await connectToDatabase();

      const tourToBook = await db
        .collection("tours")
        .findOne({ _id: new ObjectId(tour_id) });

      await db.collection("tours").findOneAndUpdate(
        { _id: new ObjectId(tour_id) },
        {
          $push: {
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
          $push: {
            bookedTours: JSON.parse(JSON.stringify(tourToBook)),
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
