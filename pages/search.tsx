import { GetServerSideProps } from "next";
import { unstable_getServerSession } from "next-auth";
import { FC } from "react";
import Map from "../components/search-page/Map";
import TourCards from "../components/tour-cards/TourCards";
import { connectToDatabase } from "../lib/mongodb";
import { wrapper } from "../store";
import { setTours } from "../store/slices/toursSlice";
import { setUser } from "../store/slices/userSlice";
import { TourResults, User } from "../types/typings";
import { authOptions } from "./api/auth/[...nextauth]";

const Search: FC = () => {
  return (
    <div className="flex flex-col">
      {/* Search Input */}
      <div className="flex ">
        {/* Map */}
        <div className="w-3/5">
          <Map />
        </div>

        {/* Tour Card List */}
        <div className=" w-2/5 overflow-auto">
          <div></div>
          <TourCards />
        </div>
      </div>
    </div>
  );
};

export default Search;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async context => {
    // Get current session
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

    // Connect to MongoDb
    const { db } = await connectToDatabase();

    // Only runs if session exists and user in redux is null
    if (session && store.getState().user.user == null) {
      const query = (await db
        .collection("users")
        .findOne({ email: session.user?.email })) as User;

      const user = JSON.parse(JSON.stringify(query));

      store.dispatch(setUser(user));
    }

    const query = await db.collection("tours").find({}).limit(8).toArray();

    const tours = JSON.parse(JSON.stringify(query));

    const results = {} as TourResults;
    results.results = tours;

    const documentCount = await db.collection("tours").countDocuments();
    results.totalPages = Math.ceil(documentCount / 8);

    if (results.totalPages > 1) {
      results.next = {
        page: 2,
        limit: 8,
      };
    }

    store.dispatch(setTours(results));

    return {
      props: {},
    };
  });
