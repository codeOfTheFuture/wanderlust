import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { connectToDatabase } from "../../../middleware/database";
import { User } from "../../../types/types";

export default nc<NextApiRequest, NextApiResponse>()
  // Get all users  - GET /api/users
  .get(async (req, res) => {
    try {
      const { db } = await connectToDatabase();
      const users = await db.collection("users").find({}).toArray();

      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  })
  .post(async (req, res) => {
    // Add a new user - POST /api/users
    const user: User = {
      offered_tours: [],
      ...req.body,
    };

    try {
      const { db } = await connectToDatabase();

      const addUser = await db.collection("users").insertOne(user);

      const newUser = await db
        .collection("users")
        .findOne({ _id: addUser.insertedId });

      res.status(200).json(newUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
