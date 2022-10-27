import { GetServerSideProps, NextPage } from "next";
import PageHeading from "../components/ui/PageHeading";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useAppSelector, wrapper } from "../store";
import { selectUser, setUser } from "../store/slices/userSlice";
import { SessionUser, User } from "../types/typings";
import TourCards from "../components/tour-cards/TourCards";
import { ObjectId } from "mongodb";
import { connectToDatabase } from "../lib/mongodb";
import { setTours } from "../store/slices/toursSlice";

const BookedTours: NextPage = () => {
  const { bookedTours } = useAppSelector(selectUser) as User;

  return (
    <>
      <PageHeading headingText="here are the the tours you've booked." />

      <section className="w-full h-[40vh] flex justify-center items-center">
        {!bookedTours?.length ? (
          <h2 className="text-lg font-medium">
            You currently don&apos;t have any tours booked
          </h2>
        ) : (
          <TourCards />
        )}
      </section>
    </>
  );
};

export default BookedTours;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async context => {
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

    const { db } = await connectToDatabase();

    if (session && store.getState().user.user == null) {
      const { id } = session.user as SessionUser;

      const userQuery = await db
          .collection("users")
          .findOne({ _id: new ObjectId(id) }),
        user = JSON.parse(JSON.stringify(userQuery)) as User;

      store.dispatch(setUser(user));

      store.dispatch(setTours(user.bookedTours));
    }

    return {
      props: {},
    };
  });
