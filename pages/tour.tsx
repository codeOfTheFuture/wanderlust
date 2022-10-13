import { GetServerSideProps, NextPage } from "next";
import { ObjectId } from "mongodb";
import RecommendedTours from "../components/tour-cards/RecommendedTours";
import TourDetails from "../components/tour-page/TourDetails";
import TourPageHeader from "../components/tour-page/TourPageHeader";
import { connectToDatabase } from "../lib/mongodb";
import { Tour, User } from "../types/typings";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { wrapper } from "../store";
import { setUser } from "../store/slices/userSlice";

interface Props {
  tours: Tour[];
  tour: Tour;
  guide: User;
}

const Tour: NextPage<Props> = props => {
  const { tour, guide, tours } = props,
    { title, tourPhotos } = tour;

  return (
    <>
      <div className="flex flex-col justify-center items-center gap-5">
        <TourPageHeader
          backgroundImage={tourPhotos[0].secure_url}
          title={title}
        />
        <TourDetails tour={tour} guide={guide} />
        <div className="w-11/12 xl:w-1/2 h-[1px] mx-auto bg-black"></div>
        <RecommendedTours tours={tours} />
      </div>
    </>
  );
};

export default Tour;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async context => {
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

    session && store.dispatch(setUser(session.user as User));

    const { db } = await connectToDatabase(),
      tourId = context.query.tour as string,
      tour = await db.collection("tours").findOne({
        _id: new ObjectId(tourId),
      }),
      guide = await db.collection("users").findOne({
        _id: tour?.guideId,
      }),
      tours = await db.collection("tours").find({}).toArray();

    return {
      props: {
        tour: JSON.parse(JSON.stringify(tour)),
        guide: JSON.parse(JSON.stringify(guide)),
        tours: JSON.parse(JSON.stringify(tours)),
      },
    };
  });
