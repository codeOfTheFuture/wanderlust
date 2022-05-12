import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { connectToDatabase } from "../../../middleware/database";

export default nc<NextApiRequest, NextApiResponse>()
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
    const user = {
      offered_tours: [],
      ...req.body,
    };

    try {
      const { db } = await connectToDatabase();

      const users = await db.collection("users").insertOne(user);

      const newUser = await db
        .collection("users")
        .findOne({ _id: users.insertedId });

      res.status(200).json(newUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
