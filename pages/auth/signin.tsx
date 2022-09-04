import { GetServerSideProps, NextPage } from "next";
import { getProviders } from "next-auth/react";
import AuthLayout from "../../components/layouts/AuthLayout";
import LoginForm from "../../components/auth-form/LoginForm";

interface Props {
  providers: any;
}

const SignIn: NextPage<Props> = ({ providers }) => {
  return (
    <AuthLayout>
      <LoginForm providers={providers} />
    </AuthLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const providers = await getProviders();
  return {
    props: {
      providers: providers,
    },
  };
};

export default SignIn;
