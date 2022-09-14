import { GetServerSideProps, NextPage } from "next";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
} from "next-auth/react";
import AuthLayout from "../../components/layouts/AuthLayout";
import AuthForm from "../../components/auth-form/LoginForm";
import { unstable_getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]";
import { BuiltInProviderType } from "next-auth/providers";
import { wrapper } from "../../store";
import { setUser } from "../../slices/userSlice";
import { User } from "../../types/typings";

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const SignUp: NextPage<Props> = ({ providers }) => {
  return (
    <AuthLayout>
      <AuthForm providers={providers} />
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async context => {
  const providers = await getProviders(),
    session = await unstable_getServerSession(
      context.req,
      context.res,
      authOptions
    );

  if (session) {
    return {
      props: {
        providers: providers,
      },
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
