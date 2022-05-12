import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { connectToDatabase } from "../../../middleware/database";

export default nc<NextApiRequest, NextApiResponse>()
  // Get a single user
  .get(async (req, res) => {
    try {
      const { db } = await connectToDatabase();
      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(req.query.user_id as string) });
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  })
  // Update an existing user
  .put(async (req, res) => {
    try {
      const { db } = await connectToDatabase();
      await db.collection("users").findOneAndUpdate(
        { _id: new ObjectId(req.query.user_id as string) },
        {
          $set: {
            ...req.body,
          },
        },
        { returnOriginal: false }
      );

      const updatedUser = await db.collection("users").findOne({
        _id: new ObjectId(req.query.user_id as string),
      });

      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  })
  // Delete an existing user
  .delete(async (req, res) => {
    try {
      const { db } = await connectToDatabase();
      await db.collection("users").deleteOne({
        _id: new ObjectId(req.query.user_id as string),
      });
      res.status(200).json({ message: "User deleted" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
