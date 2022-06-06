import { NextPage } from "next";
import { getProviders } from "next-auth/react";
import AuthLayout from "../../components/AuthLayout";
import LoginForm from "../../components/LoginForm";

interface Props {
  providers: any;
}

const SignIn: NextPage<Props> = ({ providers }) => {
  return (
    <AuthLayout>
      <LoginForm providers={providers} />
    </AuthLayout>
  )
}

export async function getServerSideProps() {
  const providers = await getProviders();
  return {
    props: {
      providers: providers
    }
  };
}

export default SignIn;