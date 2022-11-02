import { WithId } from "mongodb";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import nextConnect from "next-connect";
import { connectToDatabase } from "../../../../lib/mongodb";
import { Tour } from "../../../../types/typings";

interface Results {
  results: Tour[];
  next: {
    page: number;
    limit: number;
  };
  previous: {
    page: number;
    limit: number;
  };
  totalPages: number;
}

export default nextConnect<NextApiRequest, NextApiResponse>().get(
  async (req, res) => {
    const page = +req.query.page;
    const limit = +req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * +limit;

    try {
      const { db } = await connectToDatabase();

      const popularTours = (await db
        .collection("tours")
        .find({})
        .limit(limit)
        .skip(startIndex)
        .toArray()) as Tour[];

      const results = {} as Results;

      const documentCount = await db.collection("tours").countDocuments();

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

      results.results = popularTours;

      res.status(200).json(results);
    } catch (error) {
      console.error(error);
    }
  }
);
