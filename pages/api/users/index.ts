import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../utils/connectMongo";
import Users from "../../../models/userModel";
import { User } from "../../../types/types";

export const getAllUsers = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const users = await Users.find({});
    res.status(200).json(users);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
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
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "GET":
      await getAllUsers(req, res);
      break;
    case "POST":
      await createUser(req, res);
    default:
      res.status(405).json({ error: `Method ${method} not allowed` });
  }
};

export default connectMongo(handler);
