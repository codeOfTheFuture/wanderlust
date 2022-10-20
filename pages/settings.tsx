import { GetServerSideProps, NextPage } from "next";
import SettingsForm from "../components/settings-form/SettingsForm";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useAppDispatch, useAppSelector, wrapper } from "../store";
import {
  selectUser,
  setUser,
  updateUserSettings,
} from "../store/slices/userSlice";
import { SessionUser, User } from "../types/typings";
import { connectToDatabase } from "../lib/mongodb";
import { ObjectId } from "mongodb";

const Settings: NextPage = () => {
  const { _id } = useAppSelector(selectUser) as User,
    dispatch = useAppDispatch();

  const submitForm = (formData: any) => {
    dispatch(updateUserSettings({ userId: _id.toString(), formData }));
  };

  return (
    <>
      <div className="relative flex justify-center items-center w-full h-[92vh] bg-settings-blurred bg-cover lg:bg-center lg:bg-no-repeat ">
        <div className="absolute w-full h-full bg-black opacity-30"></div>
        <SettingsForm submitForm={submitForm} />
      </div>
    </>
  );
};

export default Settings;

export const getServerSideProps: GetServerSideProps =
  wrapper.getServerSideProps(store => async context => {
    const session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

    if (session && store.getState().user.user == null) {
      const { db } = await connectToDatabase();
      const { id } = session.user as SessionUser;

      const user = await db
        .collection("users")
        .findOne({ _id: new ObjectId(id) });

      store.dispatch(setUser(JSON.parse(JSON.stringify(user))));
    }

    // session && store.dispatch(setUser(session.user as User));

    return {
      props: {},
    };
  });
