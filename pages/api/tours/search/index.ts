import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import nextConnect from "next-connect";
import { connectToDatabase } from "../../../../lib/mongodb";
import { Tour, TourResults } from "../../../../types/typings";

// GET - /api/tours/search?page={page}&limit={limit}
export default nextConnect<NextApiRequest, NextApiResponse>().get(
  async (req, res) => {
    const page = +req.query.page;
    const limit = +req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * +limit;

    const southWestLat = parseFloat(req.query.sWLat as string);
    const northWestLat = parseFloat(req.query.nWLat as string);
    const southWestLng = parseFloat(req.query.sWLng as string);
    const northEastLng = parseFloat(req.query.nWLng as string);

    try {
      const { db } = await connectToDatabase();

      const tourSearch = (await db
        .collection("tours")
        .find({
          "address.coordinates.0": {
            $gte: southWestLng,
            $lte: northEastLng,
          },
          "address.coordinates.1": {
            $gte: southWestLat,
            $lte: northWestLat,
          },
        })
        .limit(limit)
        .skip(startIndex)
        .toArray()) as Tour[];

      const documentCount = await db.collection("tours").countDocuments({
        "address.coordinates.0": {
          $gte: southWestLng,
          $lte: northEastLng,
        },
        "address.coordinates.1": {
          $gte: southWestLat,
          $lte: northWestLat,
        },
      });

      const results = {} as TourResults;
      results.results = tourSearch;
      results.totalPages = Math.ceil(documentCount / limit);
      results.currentPage = page;
      results.limit = limit;

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

      res.status(200).json(results);
    } catch (error) {
      console.error(error);
    }
  }
);
