import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connectMongo";
import Users from "../../../models/userModel";
import { User } from "../../../types/types";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const users = await Users.find({});
      res.status(200).json(users);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "POST") {
    try {
      const user: User = {
        offered_tours: [],
        ...req.body,
      };
      const newUser = await Users.create(user);
      res.status(200).json(newUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default connectMongo(handler);
