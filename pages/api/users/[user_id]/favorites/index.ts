import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { connectToDatabase } from "../../../../../lib/mongodb";
import { Tour, User } from "../../../../../types/typings";

export default nc<NextApiRequest, NextApiResponse>().put(async (req, res) => {
  const user_id = req.query.user_id as string;
  const tour_id = req.body as string;

  try {
    const { db } = await connectToDatabase();

    const { favoriteTours } = (await db.collection("users").findOne({
      _id: new ObjectId(user_id),
    })) as User;

    if (
      favoriteTours.find((tour: Tour) => tour._id.toString() == tour_id) != null
    ) {
      const filteredFavoriteTours = favoriteTours.filter(
        (tour: Tour) => tour._id.toString() != tour_id
      );

      await db.collection("users").findOneAndUpdate(
        { _id: new ObjectId(user_id) },
        {
          $set: {
            favoriteTours: filteredFavoriteTours,
          },
        }
      );
    } else {
      const tour = await db
        .collection("tours")
        .findOne({ _id: new ObjectId(tour_id) });

      if (tour == null) {
        res.status(404).json({ message: "Tour not found" });
      } else {
        await db.collection("users").findOneAndUpdate(
          { _id: new ObjectId(user_id) },
          {
            $push: {
              favoriteTours: JSON.parse(JSON.stringify(tour)),
            },
          }
        );
      }
    }
    const updatedUser = await db
      .collection("users")
      .findOne({ _id: new ObjectId(user_id) });

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error(error);
  }
});
