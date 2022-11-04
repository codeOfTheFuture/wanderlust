import React, { FC, FormEvent, useState } from "react";
import {
  ClientSafeProvider,
  LiteralUnion,
  signIn,
  useSession,
} from "next-auth/react";
import { useRouter } from "next/router";
import AuthLink from "./AuthLink";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import LoginHeading from "./LoginHeading";
import { BuiltInProviderType } from "next-auth/providers";
import { useAppDispatch } from "../../store";

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const LoginForm: FC<Props> = ({ providers }) => {
  const router = useRouter(),
    dispatch = useAppDispatch(),
    Btn_Label = router.pathname === "/auth/signup" ? "Sign Up" : "Sign In",
    Facebook_Provider_NAME = `${Btn_Label} with ${providers?.facebook.name}`,
    Google_Provider_NAME = `${Btn_Label} with ${providers?.google.name}`,
    Facebook_Provider_ID = providers?.facebook.id,
    Google_Provider_ID = providers?.google.id;

  const [email, setEmail] = useState<string>(""),
    [password, setPassword] = useState<string>("");

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (router.pathname === "/auth/signup") {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (data.acknowledged) {
        await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        return router.push("/");
      }
    } else {
      await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      return router.push("/");
    }
  };

  return (
    <div className="bottom-28 md:bottom-36 lg:bottom-auto flex flex-col justify-evenly items-center w-[300px] md:w-[400px] lg:w-[560px] p-4 lg:p-12 bg-white z-10 rounded-sm shadow-xl shadow-black">
      <LoginHeading text={Btn_Label + " to Wanderlust"} />

      <form
        className="flex flex-col w-full justify-evenly items-center gap-4 py-3"
        onSubmit={handleFormSubmit}>
        <FormInput
          name="email"
          label="Email"
          type="text"
          value={email}
          handleChange={setEmail}
        />
        <FormInput
          name="password"
          label="Password"
          type="password"
          value={password}
          handleChange={setPassword}
        />
        <Button color="btn-primary" size="btn-md" type="submit">
          {Btn_Label}
        </Button>
      </form>
      <div className="flex justify-center items-center gap-3 my-3 w-full">
        <span className="h-[1px] w-2/5 bg-gray-400"></span>
        <span>or</span>
        <span className="h-[1px] w-2/5 bg-gray-400"></span>
      </div>
      <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-4 py-3">
        <Button
          color="btn-primary"
          size="btn-xl"
          type="button"
          onClick={() => signIn(Facebook_Provider_ID)}>
          {Facebook_Provider_NAME}
        </Button>
        <Button
          color="btn-error"
          size="btn-xl"
          type="button"
          onClick={() => signIn(Google_Provider_ID)}>
          {Google_Provider_NAME}
        </Button>
      </div>
      <AuthLink />
    </div>
  );
};

export default LoginForm;
