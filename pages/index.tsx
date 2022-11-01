import type { GetServerSideProps, NextPage } from "next";
import SearchInput from "../components/ui/SearchInput";
import { connectToDatabase } from "../lib/mongodb";
import { Tour, SessionUser } from "../types/typings";
import Button from "../components/ui/Button";
import { authOptions } from "./api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";
import { useAppSelector, wrapper } from "../store";
import { setUser } from "../store/slices/userSlice";
import TourCards from "../components/tour-cards/TourCards";
import { ObjectId } from "mongodb";
import { getToursFilter, setTours } from "../store/slices/toursSlice";
import Link from "next/link";

const Home: NextPage = () => {
  const toursFilter = useAppSelector(getToursFilter);

  return (
    <div className="w-full sm:w-5/6 lg:w-3/4 mx-auto">
      <div className="absolute top-0 left-0 bg-mountain-jump bg-no-repeat bg-cover bg-top h-[70vh] w-full"></div>

      <div className="absolute top-0 left-0 bg-black opacity-70 h-[70vh] w-full"></div>

      <div className="relative flex flex-col justify-center md:justify-center items-center h-[70vh] z-10">
        <div className="flex flex-col items-start w-full justify-center gap-2 pl-5 md:pl-0">
          <h1 className="text-4xl md:text-6xl  xl:text-8xl font-semibold text-light-text mt-52 sm:mt-44">
            Zion National Park
          </h1>
          <Link href="/search">
            <Button color="btn-primary" size="btn-lg" type="button">
              Search Map
            </Button>
          </Link>
        </div>
        <SearchInput />
      </div>

      <section className="w-full my-20">
        <h3 className="text-2xl mb-10">
          {toursFilter.charAt(0).toUpperCase() + toursFilter.slice(1)}
        </h3>
        <TourCards />
      </section>
    </div>
  );
};

export default Home;

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
      console.log("Session>>", session);
      const { id } = session.user as SessionUser;

      // const user = await db
      //   .collection("users")
      //   .findOne({ _id: new ObjectId(id) });

      const user = await db
        .collection("users")
        .findOne({ email: session.user?.email });

      store.dispatch(setUser(JSON.parse(JSON.stringify(user))));
    }

    const queryTours = await db.collection("tours").find({}).toArray(),
      tours = await JSON.parse(JSON.stringify(queryTours));

    store.dispatch(setTours(tours));

    return {
      props: {},
    };
  });
