import { GetServerSideProps, NextPage } from "next";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Message from "../components/messages/Message";
import PageHeading from "../components/ui/PageHeading";
import { selectUser } from "../store/slices/userSlice";
import { wrapper } from "../store";
import { useSelector } from "react-redux";

const Messages: NextPage = () => {
  const user = useSelector(selectUser);

  return (
    <>
      <PageHeading headingText="Here are your messages." />

      <section className="w-full flex flex-col items-center gap-5 my-10">
        <Message userImg={user?.profileImage?.secure_url as string} />
        <Message userImg={user?.profileImage?.secure_url as string} />
      </section>
    </>
  );
};

export default Messages;

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
