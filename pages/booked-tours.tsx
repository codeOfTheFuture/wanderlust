import { GetServerSideProps, NextPage } from "next";
import PageHeading from "../components/ui/PageHeading";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useAppSelector, wrapper } from "../store";
import { selectUser } from "../store/slices/userSlice";
import { User } from "../types/typings";

const BookedTours: NextPage = () => {
  const { bookedTours } = useAppSelector(selectUser) as User;

  return (
    <>
      <PageHeading headingText="here are the the tours you've booked." />

      <section className="w-full h-[40vh] flex justify-center items-center">
        {bookedTours?.length && (
          <h2 className="text-lg font-medium">
            You currently don&apos;t have any tours booked
          </h2>
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

    return {
      props: {},
    };
  });
