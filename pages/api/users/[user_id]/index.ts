import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { connectToDatabase } from "../../../../lib/mongodb";

export default nc<NextApiRequest, NextApiResponse>()
  // Get a single user - GET /api/users/:user_id
  .get(async (req, res) => {
    const USER_ID: string = req.query.user_id as string;

    try {
      const { db } = await connectToDatabase(),
        user = await db.collection("users").findOne({
          _id: new ObjectId(USER_ID),
        });
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  })
  // Update an existing user - PUT /api/users/:user_id
  .put(async (req, res) => {
    const USER_ID = req.query.user_id as string;

    try {
      const { db } = await connectToDatabase();
      await db.collection("users").findOneAndUpdate(
        {
          _id: new ObjectId(USER_ID),
        },
        {
          $set: {
            ...req.body,
          },
        }
      );

      const updatedUser = await db.collection("users").findOne({
        _id: new ObjectId(USER_ID),
      });

      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  })
  // Delete an existing user - DELETE /api/users/:user_id
  .delete(async (req, res) => {
    const USER_ID: string = req.query.user_id as string;
    try {
      const { db } = await connectToDatabase();
      await db.collection("users").deleteOne({
        _id: new ObjectId(USER_ID),
      });
      res.status(200).json({ message: "User deleted" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
