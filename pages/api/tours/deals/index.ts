import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import nextConnect from "next-connect";
import { connectToDatabase } from "../../../../lib/mongodb";

export default nextConnect<NextApiRequest, NextApiResponse>().get(
  async (req, res) => {
    try {
      const { db } = await connectToDatabase();

      const tourDeals = await db
        .collection("tours")
        .find({
          price: {
            $lt: 100,
          },
        })
        .toArray();
      console.log(tourDeals);

      res.status(200).json(tourDeals);
    } catch (error) {
      console.error(error);
    }
  }
);
