import { FC, Fragment } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const AuthLink: FC = () => {
  const router = useRouter();

  return (
    <Fragment>
      {router.pathname === "/auth/signup" ? (
        <div className="flex mt-4 text-lg">
          <span>Already have an account? </span>
          <Link href={"/auth/signin"}>
            <a className="text-blue-500 hover:text-blue-700 ml-2">Sign In</a>
          </Link>
        </div>
      ) : (
        <div className="flex mt-4 text-lg">
          <span>Don&apos;t have an account?</span>
          <Link href={"/auth/signup"}>
            <a className="text-blue-500 hover:text-blue-700 ml-2">Sign Up</a>
          </Link>
        </div>
      )}
    </Fragment>
  );
};

export default AuthLink;
