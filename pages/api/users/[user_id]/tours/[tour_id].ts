import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { connectToDatabase } from "../../../../../middleware/database";

export default nc<NextApiRequest, NextApiResponse>()
  // Update an existing tour - PUT /api/users/:user_id/tours/:tour_id
  .put(async (req, res) => {
    const USER_ID: string = req.query.user_id as string;
    const TOUR_ID: string = req.query.tour_id as string;

    try {
      const { db } = await connectToDatabase();

      const tour = await db.collection("tours").findOne({
        _id: new ObjectId(TOUR_ID),
      });

      if (tour?.guide_id.toString() !== USER_ID) {
        res.status(401).json({ error: "Unauthorized" });
      }

      await db.collection("tours").findOneAndUpdate(
        { _id: new ObjectId(TOUR_ID) },
        {
          $set: {
            ...req.body,
          },
        }
      );

      const updatedTour = await db.collection("tours").findOne({
        _id: new ObjectId(TOUR_ID),
      });

      const user = await db.collection("users").findOne({
        _id: new ObjectId(USER_ID),
      });

      const updated_tours = user?.offered_tours.map((tour: any) => {
        if (tour._id.toString() === TOUR_ID) {
          tour = updatedTour;
          return tour;
        }
        return tour;
      });

      await db.collection("users").findOneAndUpdate(
        { _id: new ObjectId(USER_ID) },
        {
          $set: {
            offered_tours: updated_tours,
          },
        }
      );

      res.status(200).json(updatedTour);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  })
  // Delete an existing tour by id - DELETE /api/tours/:id
  .delete(async (req, res) => {
    const User_ID: string = req.query.user_id as string;
    const TOUR_ID: string = req.query.tour_id as string;

    try {
      const { db } = await connectToDatabase();

      const tour = await db.collection("tours").findOne({
        _id: new ObjectId(TOUR_ID),
      });

      if (!tour) {
        res.status(404).json({ error: "Tour not found" });
      }

      if (tour?.guide_id.toString() !== User_ID) {
        res.status(401).json({ error: "Unauthorized" });
      }

      await db.collection("tours").deleteOne({
        _id: new ObjectId(TOUR_ID),
      });

      const user = await db.collection("users").findOne({
        _id: new ObjectId(User_ID),
      });

      const updated_tours = user?.offered_tours.filter(
        (tour: any) => tour._id.toString() !== TOUR_ID
      );

      await db.collection("users").findOneAndUpdate(
        { _id: new ObjectId(User_ID) },
        {
          $set: {
            offered_tours: updated_tours,
          },
        }
      );

      res.status(200).json({ message: "Tour deleted" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
