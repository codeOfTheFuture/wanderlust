import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import nextConnect from "next-connect";
import { connectToDatabase } from "../../../../lib/mongodb";

export default nextConnect<NextApiRequest, NextApiResponse>().get(
  async (req, res) => {
    try {
      const { db } = await connectToDatabase();

      const popularTours = await db.collection("tours").find({}).toArray();

      res.status(200).json(popularTours);
    } catch (error) {
      console.error(error);
    }
  }
);
