import { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../../types/typings";

// const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const user: User = {
//       offered_tours: [],
//       ...req.body
//     }

//     const createdUser = await Users.create(user);
//   } catch (error: any) {
//     res.status(500).json({ message: error.message });
//   }
// }

// export const createUser = async (req: NextApiRequest, res: NextApiResponse) => {
//   try {
//     const user: User = {
//       offered_tours: [],
//       ...req.body,
//     };
//     const newUser = await Users.create(user);
//     res.status(200).json(newUser);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { method } = req;

//   switch (method) {
//     case "GET":
//       await getAllUsers(req, res);
//       break;
//     case "POST":
//       await createUser(req, res);
//     default:
//       res.status(405).json({ error: `Method ${method} not allowed` });
//   }
// };

// export default connectMongo(handler);
