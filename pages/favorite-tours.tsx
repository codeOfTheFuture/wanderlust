import { GetServerSideProps, NextPage } from "next";
import PageHeading from "../components/Ui/PageHeading";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useAppSelector, wrapper } from "../store";
import { selectUser, setUser } from "../store/slices/userSlice";
import { TourResults, User } from "../types/typings";
import TourCards from "../components/Tour-cards/TourCards";
import { connectToDatabase } from "../lib/mongodb";
import { setTours } from "../store/slices/toursSlice";

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
          <TourCards loading={false} />
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
      const response = await db
        .collection("users")
        .findOne({ email: session.user?.email });
      const user = JSON.parse(JSON.stringify(response)) as User;

      store.dispatch(setUser(user));

      const page = 1;
      const limit = store.getState().tours.tourResults.limit;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;

      const tourResults = {} as TourResults;
      tourResults.currentPage = page;
      tourResults.results = user.favoriteTours.slice(startIndex, endIndex);
      tourResults.totalPages = Math.ceil(user.favoriteTours.length / limit);
      tourResults.limit = limit;

      if (user.favoriteTours.length > limit) {
        tourResults.next = {
          page: page + 1,
        };
      }

      store.dispatch(setTours(tourResults));
    }

    return {
      props: {},
    };
  });
