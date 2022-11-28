import { Fragment } from "react";
import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import TourForm from "../components/tour-form/TourForm";
import { wrapper } from "../store";
import { connectToDatabase } from "../lib/mongodb";
import { ObjectId } from "mongodb";
import { Tour } from "../types/typings";
import { setUser } from "../store/slices/userSlice";

interface Props {
  tour: Tour;
}

const UpdateTour: NextPage<Props> = ({ tour }) => {
  const submitForm = async (tourToUpdate: Tour) => {
    await fetch(`/api/tours/${tour._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tourToUpdate),
    });
  };

  const deleteTour = async () => {
    await fetch(`/api/tours/${tour._id}`, {
      method: "DELETE",
    });
  };

  return (
    <Fragment>
      <TourForm tour={tour} submitForm={submitForm} deleteTour={deleteTour} />
    </Fragment>
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
      const user = await db
        .collection("users")
        .findOne({ email: session.user?.email });

      store.dispatch(setUser(JSON.parse(JSON.stringify(user))));
    }

    const tour = await db.collection("tours").findOne({
      _id: new ObjectId(context.query.tour as string),
    });

    return {
      props: {
        tour: JSON.parse(JSON.stringify(tour)),
      },
    };
  });
