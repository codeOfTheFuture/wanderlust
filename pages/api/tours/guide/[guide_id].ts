import { ObjectId } from "mongodb";
import nc from "next-connect";
import { NextApiRequest, NextApiResponse } from "next";
import { connectToDatabase } from "../../../../lib/mongodb";
import { Tour, TourResults } from "../../../../types/typings";

export default nc<NextApiRequest, NextApiResponse>()
  // - GET /api/tours/:user_id?page={page}&limit={limit}
  // Get tours for a single guide

  .get(async (req, res) => {
    const user_id = req.query.user_id as string;
    const page = +req.query.page;
    const limit = +req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * +limit;

    try {
      const { db } = await connectToDatabase();
      const tours = (await db
        .collection("tours")
        .find({
          guideId: new ObjectId(user_id),
        })
        .limit(limit)
        .skip(startIndex)
        .toArray()) as Tour[];

      const results = {} as TourResults;
      const documentCount = tours.length;

      if (endIndex < documentCount) {
        results.next = {
          page: page + 1,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
        };
      }

      results.totalPages = Math.ceil(documentCount / limit);

      results.results = tours;

      res.status(200).json(results);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Server error" });
    }
  });
