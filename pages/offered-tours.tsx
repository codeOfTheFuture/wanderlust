import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Button from "../components/ui/Button";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import PageHeading from "../components/ui/PageHeading";
import { wrapper } from "../store";
import { selectUser, setUser } from "../store/slices/userSlice";
import { useSelector } from "react-redux";
import { SessionUser, Tour, User } from "../types/typings";
import { connectToDatabase } from "../lib/mongodb";
import TourCards from "../components/tour-cards/TourCards";
import { ObjectId } from "mongodb";

interface Props {
  offeredTours: Tour[];
}

const OfferedTours: NextPage<Props> = ({ offeredTours }) => {
  const { registerAsGuide } = useSelector(selectUser) as User;

  return (
    <>
      <PageHeading headingText="Here you can add, edit, and delete your offered tours." />

      <section className="flex flex-col justify-center items-center gap-10 w-full sm:w-5/6 lg:w-3/4 min-h-[33vh] mx-auto my-20">
        {!registerAsGuide || offeredTours.length === 0 ? (
          <h2 className="text-base md:text-xl font-medium">
            {!registerAsGuide
              ? "Please register as a guide in your settings if you would like to create a tour"
              : "You currently have no offered tours"}
          </h2>
        ) : null}

        {offeredTours?.length > 0 && <TourCards tours={offeredTours} />}

        <Link href={!registerAsGuide ? "/settings" : "/create-tour"}>
          <Button color="btn-primary" size="btn-lg" type="button">
            {!registerAsGuide ? "Go to settings" : "Create Tour"}
          </Button>
        </Link>
      </section>
    </>
  );
};

export default OfferedTours;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async context => {
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );
    const { id } = session?.user as SessionUser;

    const { db } = await connectToDatabase();

    const queryOfferedTours = await db
        .collection("tours")
        .find({
          guideId: new ObjectId(id),
        })
        .toArray(),
      offeredTours = (await JSON.parse(
        JSON.stringify(queryOfferedTours)
      )) as Tour[];

    // Only runs if session exists and user in redux is null
    if (session && store.getState().user.user == null) {
      const { id } = session.user as SessionUser;

      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(id) });

      store.dispatch(setUser(JSON.parse(JSON.stringify(user))));
    }

    return {
      props: {
        offeredTours,
      },
    };
  });
