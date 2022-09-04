import React, { FC } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import AuthLink from "./AuthLink";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import LoginHeading from "./LoginHeading";

interface Props {
  providers: any;
}

const LoginForm: FC<Props> = ({ providers }) => {
  const Router = useRouter(),
    Btn_Label = Router.pathname === "/auth/signup" ? "Sign Up" : "Sign In",
    Facebook_Provider_NAME = `${Btn_Label} with ${providers.facebook.name}`,
    Google_Provider_NAME = `${Btn_Label} with ${providers.google.name}`,
    Facebook_Provider_ID: string = providers.facebook.id,
    Google_Provider_ID: string = providers.google.id;

  return (
    <div className="bottom-28 md:bottom-36 lg:bottom-auto flex flex-col items-center w-[300px] md:w-[400px] lg:w-[550px] p-4 lg:p-10 bg-white z-10 rounded-sm shadow-xl shadow-black">
      <LoginHeading text={Btn_Label + " to Wanderlust"} />

      <form className="flex flex-col mt-6 gap-1 w-full">
        <div className="flex flex-col justify-evenly items-center gap-4 w-full lg:w-5/6 mx-auto">
          <FormInput name="email" label="Email" type="email" />
          <FormInput name="password" label="Password" type="password" />
          <Button color="btn-primary" size="btn-md" type="submit">
            {Btn_Label}
          </Button>
        </div>
        <div className="flex items-center gap-3 w-full mx-5">
          <span className="h-[1px] w-2/5 bg-gray-400"></span>
          <span>or</span>
          <span className="h-[1px] w-2/5 bg-gray-400"></span>
        </div>
      </form>
      <div className="flex flex-col lg:flex-row justify-center items-center w-full mt-6 gap-4">
        <Button
          color="btn-primary"
          size="btn-xl"
          type="button"
          onClick={() => signIn(Facebook_Provider_ID, { callbackUrl: "/" })}>
          {Facebook_Provider_NAME}
        </Button>
        <Button
          color="btn-error"
          size="btn-xl"
          type="button"
          onClick={() => signIn(Google_Provider_ID, { callbackUrl: "/" })}>
          {Google_Provider_NAME}
        </Button>
      </div>
      <AuthLink />
    </div>
  );
};

export default LoginForm;
