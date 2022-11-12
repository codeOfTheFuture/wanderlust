import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import nextConnect from "next-connect";
import { connectToDatabase } from "../../../../lib/mongodb";
import { Tour, TourResults } from "../../../../types/typings";

// GET - /api/tours/search?page={page}&limit={limit}
export default nextConnect<NextApiRequest, NextApiResponse>().get(
  async (req, res) => {
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
        .toArray()) as Tour[];

      res.status(200).json(tourSearch);
    } catch (error) {
      console.error(error);
    }
  }
);
