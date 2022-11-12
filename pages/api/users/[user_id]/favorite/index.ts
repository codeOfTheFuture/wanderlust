import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nextConnect from "next-connect";
import { connectToDatabase } from "../../../../../lib/mongodb";
import { TourResults, User } from "../../../../../types/typings";

export default nextConnect<NextApiRequest, NextApiResponse>()
  .get(async (req, res) => {
    const user_id = req.query.user_id as string;
    const page = +req.query.page;
    const limit = +req.query.limit;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    try {
      const { db } = await connectToDatabase();

      const { favoriteTours } = (await db
        .collection("users")
        .findOne({ _id: new ObjectId(user_id) })) as User;

      const tourCount = favoriteTours.length;

      const results = {} as TourResults;
      results.results = favoriteTours.slice(startIndex, endIndex);
      results.totalPages = Math.ceil(tourCount / limit);
      results.currentPage = page;
      results.limit = limit;

      if (endIndex < tourCount) {
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
      res.status(500);
      console.error(error);
    }
  })
  .put(async (req, res) => {
    const user_id = req.query.user_id as string;
    const tour_id = req.body as string;

    try {
      const { db } = await connectToDatabase();

      const tour = await db
        .collection("tours")
        .findOne({ _id: new ObjectId(tour_id) });

      const { value } = await db.collection("users").findOneAndUpdate(
        { _id: new ObjectId(user_id) },
        {
          $push: {
            favoriteTours: JSON.parse(JSON.stringify(tour)),
          },
        },
        {
          returnDocument: "after",
        }
      );

      if (!value) {
        res.status(400).json({ message: "Something went wrong" });
      }
      res.status(200).json(value);
    } catch (error) {
      res.status(500);
      console.error(error);
    }
  });
