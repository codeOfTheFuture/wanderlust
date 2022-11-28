import { GetServerSideProps, NextPage } from "next";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
} from "next-auth/react";
import AuthForm from "../../components/auth-form/LoginForm";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { BuiltInProviderType } from "next-auth/providers";

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const SignUp: NextPage<Props> = ({ providers }) => {
  return (
    <>
      <AuthForm providers={providers} />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const providers = await getProviders(),
    session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

  console.log("Session>>>>", session);

  if (session) {
    return {
      props: {},
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      providers: providers,
    },
  };
};

export default SignUp;
