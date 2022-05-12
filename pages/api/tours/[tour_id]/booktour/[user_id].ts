import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { connectToDatabase } from "../../../../../middleware/database";

export default nc<NextApiRequest, NextApiResponse>()
  // Book a tour
  .put(async (req, res) => {
    const TOUR_ID: string = req.query.tour_id as string;
    const TOURIST_ID: string = req.query.user_id as string;

    console.log(TOUR_ID, TOURIST_ID);
    try {
      // Connect to the database
      const { db } = await connectToDatabase();

      // Query the database for the tourist user data
      const tourist: any = await db.collection("users").findOne({
        _id: new ObjectId(TOURIST_ID),
      });
      console.log("tourist", tourist);
      // Add the tourist to the tour in the tours collection
      await db.collection("tours").findOneAndUpdate(
        { _id: new ObjectId(TOUR_ID) },
        {
          $push: {
            booked_tourists: { ...tourist },
          },
        }
      );

      // Query's the tour again to get the updated data
      const updatedTour = await db.collection("tours").findOne({
        _id: new ObjectId(TOUR_ID),
      });
      console.log("updatedTour", updatedTour);
      // Get's the id of the guide
      // Query the guide to get the offered tours
      const GUIDE_ID: string = updatedTour?.guide_id as string,
        guide = await db
          .collection("users")
          .findOne({ _id: new ObjectId(GUIDE_ID) }),
        offered_tours = guide?.offered_tours;
      // Finds the tour in the offered tours and updates the booked_tourists with the new tourist
      console.log("offered_tours", offered_tours);
      const updated_offered_tours = offered_tours.map((tour: any) => {
        if (tour.tour_id.toString() === TOUR_ID) {
          tour.booked_tourists = updatedTour?.booked_tourists;
          return tour;
        }
        return tour;
      });

      // Updates the guide's offered tours
      await db.collection("users").findOneAndUpdate(
        { _id: new ObjectId(GUIDE_ID) },
        {
          $set: {
            offered_tours: updated_offered_tours,
          },
        }
      );

      res.status(200).json(updatedTour);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  })
  // Delete an existing tour
  .delete(async (req, res) => {
    try {
      const { db } = await connectToDatabase();
      await db.collection("tours").deleteOne({
        _id: new ObjectId(req.query.tour_id as string),
      });
      res.status(200).json({ message: "Tour deleted" });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });
