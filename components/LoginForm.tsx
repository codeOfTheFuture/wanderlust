import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import AuthLink from "./AuthLink";
import Button from "./Button";
import LoginFormGroup from "./LoginFormGroup";
import LoginHeading from "./LoginHeading";

interface Props {
  providers: any;
}

const LoginForm: React.FC<Props> = ({ providers }) => {
  const router = useRouter();
  const btnText = router.pathname === "/auth/signup" ? "Sign up" : "Sign in";

  return (
    <div className='bottom-28 md:bottom-36 lg:bottom-auto flex flex-col items-center w-[300px] md:w-[400px] lg:w-[550px] p-4 lg:p-10 bg-white z-10 rounded-sm shadow-xl shadow-black'>
      <LoginHeading text={btnText + " to Wanderlust"} />

      <form className='flex flex-col mt-6 gap-1 w-full'>
        <div className='w-full lg:w-5/6 mx-auto p-5'>
          {router.pathname === "/auth/signup" && (
            <LoginFormGroup id='name' text='Name' type='text' />
          )}
          <LoginFormGroup id='email' text='Email' type='text' />
          <LoginFormGroup id='password' text='Password' type='password' />
          <Button
            btnStyles='bg-blue-500 hover:bg-blue-700 text-white font-bold w-full mt-2 py-2 px-4'
            text={btnText}
            provider={null}
            type='submit'
          />
        </div>
        <div className='flex items-center gap-3 w-full mx-5'>
          <span className='h-[1px] w-2/5 bg-gray-400'></span>
          <span>or</span>
          <span className='h-[1px] w-2/5 bg-gray-400'></span>
        </div>
      </form>
      <div className='flex flex-col lg:flex-row justify-center items-center w-full mt-6 gap-4'>
        <Button
          btnStyles='bg-blue-500 hover:bg-blue-700 text-white font-bold w-56 h-14 py-2 px-4'
          provider={providers.facebook}
          text={btnText}
          type={undefined}
        />
        <Button
          btnStyles='bg-red-500 hover:bg-red-700 text-white font-bold w-56 h-14 py-2 px-4'
          provider={providers.google}
          text={btnText}
          type={undefined}
        />
      </div>
      <AuthLink />
    </div>
  );
};

export default LoginForm;
