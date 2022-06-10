import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../../utils/connectMongo";
import Users from "../../../../models/userModel";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const user = await Users.findOne({
        _id: new ObjectId(req.query.user_id as string),
      });
      res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "PUT") {
    try {
      const updatedUser = await Users.findOneAndUpdate(
        { _id: new ObjectId(req.query.user_id as string) },
        {
          $set: {
            ...req.body,
          },
        }
      );
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else if (req.method === "DELETE") {
    try {
      await Users.findOneAndDelete({
        _id: new ObjectId(req.query.user_id as string),
      });
      res.status(200).json({ message: "User deleted" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
};

export default connectMongo(handler);
