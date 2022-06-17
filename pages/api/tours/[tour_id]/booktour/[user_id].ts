import { ObjectId } from "mongodb";
import { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../../../utils/connectMongo";
import Tours from "../../../../../models/tourModel";
import Users from "../../../../../models/userModel";
import { Tour, User } from "../../../../../types/types";

// Book a tour - PUT /api/tours/:tour_id/booktour/:user_id
export const bookTour = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const user = await Tours.findOne({
      _id: new ObjectId(req.query.tour_id as string),
    });

    await Tours.findOneAndUpdate({
      _id: new ObjectId(req.query.tour_id as string),
      $push: {
        booked_tourists: { ...user },
      },
    });

    const updatedTour = await Tours.findOne({
      _id: new ObjectId(req.query.tour_id as string),
    });

    const guide_id: string = updatedTour?.guide_id as string;

    const guide = await Users.findOne({ _id: new ObjectId(guide_id) });

    const offered_tours: Tour[] = guide?.offered_tours;

    const updated_offered_tours = offered_tours.map((tour: Tour) => {
      if (tour._id.toString() === req.query.tour_id) {
        tour.booked_tourists = updatedTour?.booked_tourists;
        return tour;
      }
      return tour;
    });

    await Users.findOneAndUpdate(
      { _id: new ObjectId(guide_id) },
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
};

// Unbook a tour - DELETE /api/tours/:tour_id/booktour/:user_id
export const unbookTour = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tour = await Tours.findOne({
      _id: new ObjectId(req.query.tour_id as string),
    });

    const guide_id: string = tour?.guide_id as string;

    const guide = await Users.findOne({ _id: new ObjectId(guide_id) });

    const offered_tours: Tour[] = guide?.offered_tours;

    let updated_booked_tourists: User[] = [];

    // Finds the tour in the offered tours and removes the user the booked_tourists
    const updated_offered_tours = offered_tours.map((tour: Tour) => {
      if (tour._id.toString() === req.query.tour_id) {
        updated_booked_tourists = tour.booked_tourists =
          tour.booked_tourists.filter(
            (tourist: User) => tourist._id.toString() !== req.query.user_id
          );
        return tour;
      }
      return tour;
    });

    // Updates the tour in the tours collection
    await Tours.findOneAndUpdate(
      { _id: new ObjectId(req.query.tour_id as string) },
      { $set: { booked_tourists: updated_booked_tourists } }
    );

    // Updates the guide's offered tours in the users collection
    await Users.findOneAndUpdate(
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
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;

  switch (method) {
    case "PUT":
      await bookTour(req, res);
      break;
    case "DELETE":
      await unbookTour(req, res);
      break;
    default:
      res.status(405).end(`Method ${method} Not Allowed`);
  }
};

export default connectMongo(handler);
