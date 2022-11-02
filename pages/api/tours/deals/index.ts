import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import nextConnect from "next-connect";
import { connectToDatabase } from "../../../../lib/mongodb";
import { Tour, TourResults } from "../../../../types/typings";

// GET - /api/tours/deals?page={page}&limit={limit}
export default nextConnect<NextApiRequest, NextApiResponse>().get(
  async (req, res) => {
    const page = +req.query.page;
    const limit = +req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * +limit;

    try {
      const { db } = await connectToDatabase();

      const tourDeals = (await db
        .collection("tours")
        .find({
          price: {
            $lt: 100,
          },
        })
        .limit(limit)
        .skip(startIndex)
        .toArray()) as Tour[];

      const documentCount = tourDeals.length;

      const results = {} as TourResults;

      if (endIndex < documentCount) {
        results.next = {
          page: page + 1,
          limit: limit,
        };
      }

      if (startIndex > 0) {
        results.previous = {
          page: page - 1,
          limit: limit,
        };
      }

      results.totalPages = Math.ceil(documentCount / limit);

      results.results = tourDeals;

      res.status(200).json(results);
    } catch (error) {
      console.error(error);
    }
  }
);
