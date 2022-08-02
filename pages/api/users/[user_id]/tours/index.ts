import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

import { Tour } from "../../../../../types/types";

// export const createTour = async (req: NextApiRequest, res: NextApiResponse) => {
//   const tour: Tour = {
//     guide_id: new ObjectId(req.query.user_id as string),
//     booked_tourists: [],
//     tour_date: new Date("2022-08-01"),
//     created_at: new Date(),
//     ...req.body,
//   };
//   const { booked_tourists } = tour;
//   try {
//     const addedTour = await Tours.create(tour);

//     await Users.findOneAndUpdate(
//       { _id: new ObjectId(req.query.user_id as string) },
//       {
//         $push: {
//           offered_tours: {
//             _id: addedTour.insertedId,
//             booked_tourists,
//             ...req.body,
//           },
//         },
//       }
//     );

//     const newTour = await Tours.findOne({
//       _id: addedTour.insertedId,
//     });

//     res.status(200).json(newTour);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   if (req.method === "POST") {
//     await createTour(req, res);
//   } else {
//     res.status(405).json({ message: `Method ${req.method} not allowed.` });
//   }
// };

// export default connectMongo(handler);
