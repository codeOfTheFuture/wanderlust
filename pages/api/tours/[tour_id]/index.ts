import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";

// // Get a tour by id - GET /api/tours/:id
// export const getTourById = async (tourId: string) => {
//   try {
//     const tour = await Tours.findOne({
//       _id: new ObjectId(tourId),
//     });
//     return tour;
//   } catch (error: any) {
//     return error;
//   }
// };

// const handler = async (req: NextApiRequest, res: NextApiResponse) => {
//   const { method } = req;
//   const { id } = req.query;
//   try {
//     switch (method) {
//       case "GET":
//         const tour = await getTourById(id as string);
//         res.status(200).json(tour);
//         break;
//       default:
//         res
//           .status(405)
//           .json({ statusCode: 405, message: `Method ${method} not allowed!` });
//         break;
//     }
//   } catch (error: any) {
//     res.status(500).json({ statusCode: 500, message: error.message });
//   }
// };

// export default connectMongo(handler);
