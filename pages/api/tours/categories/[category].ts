import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import nextConnect from "next-connect";
import { connectToDatabase } from "../../../../lib/mongodb";

export default nextConnect<NextApiRequest, NextApiResponse>().get(
  "/api/tours/categories/:category",
  async (req, res) => {
    const category = req.query.category;

    try {
      const { db } = await connectToDatabase();

      const toursCategory = await db
        .collection("tours")
        .find({
          category: category,
        })
        .toArray();
      console.log(toursCategory);

      res.status(200).json(toursCategory);
    } catch (error) {
      console.error(error);
    }
  }
);
