import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

import { Tour } from "../../../../../types/typings";

// export const updateTourById = async (
//   req: NextApiRequest,
//   res: NextApiResponse
// ) => {
//   try {
//     const tour = await Users.findOne({
//       _id: new ObjectId(req.query.tour_id as string),
//     });

//     if (tour?.guide_id.toString() !== req.query.user_id) {
//       res.status(401).json({ error: "Unauthorized" });
//     }

//     const updatedTour = await Tours.findOneAndUpdate(
//       { _id: new ObjectId(req.query.tour_id as string) },
//       {
//         $set: {
//           ...req.body,
//         },
//       }
//     );

//     const guide = await Users.findOne({
//       _id: new ObjectId(updatedTour?.guide_id as string),
//     });

//     const offered_tours: Tour[] = guide?.offered_tours;

//     const updated_offered_tours = offered_tours.map((tour: Tour) => {
//       if (tour._id.toString() === req.query.tour_id) {
//         tour = updatedTour;
//         return tour;
//       }
//       return tour;
//     });

//     await Users.findOneAndUpdate(
//       { _id: new ObjectId(guide?._id as string) },
//       {
//         $set: {
//           offered_tours: updated_offered_tours,
//         },
//       }
//     );

//     res.status(200).json(updatedTour);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// export const deleteTourById = async (
//   req: NextApiRequest,
//   res: NextApiResponse
// ) => {
//   try {
//     const tour = await Tours.findOne({
//       _id: new ObjectId(req.query.tour_id as string),
//     });

//     if (!tour) {
//       res.status(404).json({ error: "Tour not found" });
//     }

//     if (tour?.guide_id.toString() !== req.query.user_id) {
//       res.status(401).json({ error: "Unauthorized" });
//     }

//     await Tours.findOneAndDelete({
//       _id: new ObjectId(req.query.tour_id as string),
//     });

//     const guide = await Users.findOne({
//       _id: new ObjectId(req.query.user_id as string),
//     });

//     const updated_offered_tours = guide?.offered_tours.filter(
//       (tour: Tour) => tour._id.toString() !== req.query.tour_id
//     );

//     await Users.findOneAndUpdate(
//       { _id: new ObjectId(req.query.user_id as string) },
//       {
//         $set: {
//           offered_tours: updated_offered_tours,
//         },
//       }
//     );

//     res.status(200).json({ message: "Tour deleted" });
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { method } = req;

//   switch (method) {
//     case "PUT":
//       await updateTourById(req, res);
//       break;
//     case "DELETE":
//       await deleteTourById(req, res);
//       break;
//     default:
//       res.status(405).json({ error: `Method ${method} not allowed` });
//   }
// };

// export default connectMongo(handler);
