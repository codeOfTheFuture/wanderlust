import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

// Leave a review for a tour - PUT /api/tours/:tour_id/tour-review/:user_id

// export const addTourReview = async (
//   req: NextApiRequest,
//   res: NextApiResponse
// ) => {
//   try {
//     const updatedTour = await Tours.findOneAndUpdate(
//       { _id: new ObjectId(req.query.tour_id as string) },
//       {
//         $push: {
//           tour_reviews: {
//             user_id: new ObjectId(req.query.user_id as string),
//             ...req.body,
//           },
//         },
//       }
//     );
//     res.status(200).json(updatedTour);
//   } catch (error: any) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { method } = req;

//   switch (method) {
//     case "PUT":
//       await addTourReview(req, res);
//       break;
//     default:
//       res.status(405).end(`Method ${method} Not Allowed`);
//   }
// };

// export default connectMongo(handler);
