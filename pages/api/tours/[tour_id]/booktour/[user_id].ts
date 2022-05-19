import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import nc from "next-connect";
import { connectToDatabase } from "../../../../../middleware/database";
import { Tour, User } from "../../../../../types/types";

export default nc<NextApiRequest, NextApiResponse>()
  // - PUT /api/tours/[tour_id]/booktour/[user_id]
  // Tourist book a tour - add to the tourist's booked tours and add the tourist to the tour's booked tourist list
  .put(async (req, res) => {
    const TOUR_ID: string = req.query.tour_id as string;
    const TOURIST_ID: string = req.query.user_id as string;

    try {
      const { db } = await connectToDatabase();

      // Query the database for the tourist user data
      const user: any = await db.collection("users").findOne({
        _id: new ObjectId(TOURIST_ID),
      });
      // Add the tourist to the tour's booked_tourists in the tours collection
      await db.collection("tours").findOneAndUpdate(
        { _id: new ObjectId(TOUR_ID) },
        {
          $push: {
            booked_tourists: { ...user },
          },
        }
      );

      // Query's the tour to get the updated data
      const updatedTour = await db.collection("tours").findOne({
        _id: new ObjectId(TOUR_ID),
      });
      // Get's the id of the guide
      // Query the guide to get the offered tours
      const GUIDE_ID: string = updatedTour?.guide_id as string;

      const guide = await db
        .collection("users")
        .findOne({ _id: new ObjectId(GUIDE_ID) });
      const offered_tours: Tour[] = guide?.offered_tours;
      // Finds the tour in the offered tours and updates the booked_tourists with the new tourist
      const updated_offered_tours = offered_tours.map((tour: Tour) => {
        if (tour._id.toString() === TOUR_ID) {
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
  // Unbook a tour
  .delete(async (req, res) => {
    const TOUR_ID: string = req.query.tour_id as string,
      TOURIST_ID: string = req.query.user_id as string;

    try {
      const { db } = await connectToDatabase();

      // Query the database for the tour data
      // Get the id of the guide of the tour
      // Query the database for the guide data
      // Get the guide's offered tours
      const tour = await db
          .collection("tours")
          .findOne({ _id: new ObjectId(TOUR_ID) }),
        guide_id: ObjectId = tour?.guide_id,
        guide = await db.collection("users").findOne({ _id: guide_id }),
        offered_tours: Tour[] = guide?.offered_tours;
      let updated_booked_tourists: User[] = [];

      // Finds the tour in the offered tours and removes the user the booked_tourists
      const updated_offered_tours = offered_tours.map((tour: Tour) => {
        if (tour._id.toString() === TOUR_ID) {
          updated_booked_tourists = tour.booked_tourists =
            tour.booked_tourists.filter(
              (tourist: User) => tourist._id.toString() !== TOURIST_ID
            );
          return tour;
        }
        return tour;
      });

      // Updates the tour in the tours collection
      await db
        .collection("tours")
        .findOneAndUpdate(
          { _id: new ObjectId(TOUR_ID) },
          { $set: { booked_tourists: updated_booked_tourists } }
        );

      // Updates the guide's offered tours in the users collection
      await db.collection("users").findOneAndUpdate(
        { _id: new ObjectId(guide_id) },
        {
          $set: {
            offered_tours: updated_offered_tours,
          },
        }
      );
      res.status(200).json(updated_offered_tours);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

// Tour of Hollywood
// Tour Description: A tour of Hollywood. This tour is for people who want to see the greatest movies in Hollywood.  See all of the sights and sounds of Hollywood.
