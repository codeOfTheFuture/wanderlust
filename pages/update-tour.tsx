import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import TourForm from "../components/tour-form/TourForm";
import { wrapper } from "../store";
import { connectToDatabase } from "../lib/mongodb";
import { ObjectId } from "mongodb";
import { SessionUser, Tour, User } from "../types/typings";
import { setUser } from "../store/slices/userSlice";

interface Props {
  tour: Tour;
}

const UpdateTour: NextPage<Props> = ({ tour }) => {
  const submitForm = async (tourToUpdate: Tour) => {
    const response = await fetch(`/api/tours/${tour._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tourToUpdate),
    });

    const updatedTour = await response.json();

    console.log("added tour>>>>>", updatedTour);
  };

  const deleteTour = async () => {
    const response = await fetch(`/api/tours/${tour._id}`, {
      method: "DELETE",
    });

    const deletedTour = await response.json();

    console.log("Deleted Tour>>>>>", deletedTour);
  };

  return (
    <>
      <TourForm tour={tour} submitForm={submitForm} deleteTour={deleteTour} />
    </>
  );
};

export default UpdateTour;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async context => {
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

    const { db } = await connectToDatabase();

    // Only runs if session exists and user in redux is null
    if (session && store.getState().user.user == null) {
      const { id } = session.user as SessionUser;

      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(id) });

      store.dispatch(setUser(JSON.parse(JSON.stringify(user))));
    }

    const tour = await db.collection("tours").findOne({
      _id: new ObjectId(context.query.tour as string),
    });

    console.log("tour in update>>>>", tour);

    return {
      props: {
        tour: JSON.parse(JSON.stringify(tour)),
      },
    };
  });
