import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../../utils/connectMongo";
import Users from "../../../../models/userModel";

export const getUserById = async (userId: string) => {
  try {
    const user = await Users.findOne({
      _id: new ObjectId(userId),
    });
    return user;
  } catch (error: any) {
    return error;
  }
};

export const updateUserById = async (userId: string, userData: Object) => {
  try {
    const updatedUser = await Users.findOneAndUpdate(
      { _id: new ObjectId(userId) },
      {
        $set: {
          ...userData,
        },
      }
    );
    return updatedUser;
  } catch (error: any) {
    return error;
  }
};

export const deleteUserById = async (userId: string) => {
  try {
    await Users.findOneAndDelete({
      _id: new ObjectId(userId),
    });
    return { message: "User deleted" };
  } catch (error: any) {
    return error;
  }
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  try {
    switch (method) {
      case "GET":
        const user = await getUserById(req.query.user_id as string);
        res.status(200).json(user);
        break;
      case "PUT":
        const updatedUser = await updateUserById(
          req.query.user_id as string,
          req.body
        );
        res.status(200).json(updatedUser);
        break;
      case "DELETE":
        const deletedUser = await deleteUserById(req.query.user_id as string);
        res.status(200).json(deletedUser);
        break;
      default:
        res
          .status(405)
          .json({ statusCode: 405, message: `Method ${method} not allowed!` });
        break;
    }
  } catch (error: any) {
    res.status(500).json({ statusCode: 500, message: error.message });
  }
};

export default connectMongo(handler);
