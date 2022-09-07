import { GetServerSideProps, NextPage } from "next";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
} from "next-auth/react";
import AuthLayout from "../../components/layouts/AuthLayout";
import AuthForm from "../../components/auth-form/LoginForm";
import { BuiltInProviderType } from "next-auth/providers";
import { authOptions } from "../api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth";

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const SignIn: NextPage<Props> = ({ providers }) => {
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

export default SignIn;
