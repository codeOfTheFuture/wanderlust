import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { connectToDatabase } from "../../../middleware/database";

// interface User {
//   _id: ObjectId;
//   first_name: string;
//   last_name: string;
//   address: string;
//   city: string;
//   state: string;
//   zip: string;
//   email: string;
//   phone: string;
//   photoURL: string;
//   created_at: Date;
//   guide: boolean;
//   active_tours: any[];
//   purchased_tours: any[];
//   completed_tours: any[];
//   cancelled_tours: any[];
// }

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
    try {
      const { db } = await connectToDatabase();

      const users = await db.collection("users").insertOne(req.body);

      const newUser = await db
        .collection("users")
        .findOne({ _id: users.insertedId });

      res.status(200).json(newUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
