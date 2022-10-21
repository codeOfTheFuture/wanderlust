import { GetServerSideProps, NextPage } from "next";
import PageHeading from "../components/ui/PageHeading";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useAppSelector, wrapper } from "../store";
import { selectUser, setUser } from "../store/slices/userSlice";
import { SessionUser, User } from "../types/typings";
import TourCards from "../components/tour-cards/TourCards";
import { connectToDatabase } from "../lib/mongodb";
import { ObjectId } from "mongodb";

const FavoriteTours: NextPage = () => {
  const { favoriteTours } = useAppSelector(selectUser) as User;

  return (
    <>
      <PageHeading headingText="here are your favorite tours" />

      <section className="flex flex-col justify-center items-center gap-10 w-full sm:w-5/6 lg:w-3/4 min-h-[33vh] mx-auto my-20">
        {!favoriteTours?.length ? (
          <h2 className="text-lg font-medium">
            You don&apos;t have any favorite tours.
          </h2>
        ) : (
          <TourCards tours={favoriteTours} />
        )}
      </section>
    </>
  );
};

export default FavoriteTours;

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

      const user = (await db
        .collection("users")
        .findOne({ _id: new ObjectId(id) })) as User;

      store.dispatch(setUser(JSON.parse(JSON.stringify(user))));
    }

    return {
      props: {},
    };
  });
