import React, { FC, FormEvent, useState } from "react";
import { ClientSafeProvider, LiteralUnion, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import AuthLink from "./AuthLink";
import Button from "../ui/Button";
import FormInput from "../ui/FormInput";
import { BuiltInProviderType } from "next-auth/providers";
import toast, { Toaster } from "react-hot-toast";

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
}

const LoginForm: FC<Props> = ({ providers }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const btnLabel = router.pathname === "/auth/signup" ? "Sign Up" : "Sign In";
  const facebookProviderName = `${btnLabel} with ${providers?.facebook.name}`;
  const googleProviderName = `${btnLabel} with ${providers?.google.name}`;
  const facebookProviderId = providers?.facebook.id;
  const googleProviderId = providers?.google.id;

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (router.pathname === "/auth/signup") {
      toast.loading("Please wait while your account is created...");

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
        const signUpResponse = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (signUpResponse?.ok) {
          toast.dismiss();
          toast.success("Signup Successful!");
        }

        if (signUpResponse?.error) {
          toast.dismiss();
          toast.error("Error Creating Account.");
        }

        return router.push("/");
      }
    } else {
      toast.loading("Please wait...");

      const signInResponse = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (signInResponse?.ok) {
        toast.dismiss();
        toast.success("SignIn Successful!");
      }

      if (signInResponse?.error) {
        toast.dismiss();
        toast.error("Error Signing In.");
      }

      return router.push("/");
    }
  };

  return (
    <div className="bottom-28 md:bottom-36 lg:bottom-auto flex flex-col justify-evenly items-center w-[300px] md:w-[400px] lg:w-[560px] p-4 lg:p-12 bg-white z-10 rounded-sm shadow-xl shadow-black">
      <h1 className="text-2xl font-bold text-primary-color mb-10">
        {btnLabel + " to Wanderlust"}
      </h1>
      <Toaster />

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
          {btnLabel}
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
          onClick={() => signIn(facebookProviderId)}>
          {facebookProviderName}
        </Button>
        <Button
          color="btn-error"
          size="btn-xl"
          type="button"
          onClick={() => signIn(googleProviderId)}>
          {googleProviderName}
        </Button>
      </div>
      <AuthLink />
    </div>
  );
};

export default LoginForm;
