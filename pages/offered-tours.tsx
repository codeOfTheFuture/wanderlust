import { GetServerSideProps, NextPage } from "next";
import Link from "next/link";
import Button from "../components/ui/Button";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import PageHeading from "../components/ui/PageHeading";
import { wrapper } from "../store";
import { selectUser } from "../store/slices/userSlice";
import { useSelector } from "react-redux";
import { User } from "../types/typings";

const OfferedTours: NextPage = () => {
  const { registerAsGuide, offeredTours } = useSelector(selectUser) as User;

  return (
    <>
      <PageHeading headingText="Here you can add, edit, and delete your offered tours." />

      <section className="flex flex-col justify-center items-center gap-5 h-[40vh]">
        <h2 className="text-xl font-medium">
          {!registerAsGuide
            ? "Please register as a guide in your settings if you would like to create a tour"
            : offeredTours.length === 0 &&
              "You currently have no offered tours"}
        </h2>

        {!registerAsGuide ? (
          <Link href="/settings">
            <Button color="btn-primary" size="btn-lg" type="button">
              Settings
            </Button>
          </Link>
        ) : (
          <Link href="/create-tour">
            <Button color="btn-primary" size="btn-lg" type="button">
              Create Tour
            </Button>
          </Link>
        )}
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

    return {
      props: {},
    };
  });
