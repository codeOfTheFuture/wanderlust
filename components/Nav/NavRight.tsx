import React, { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import NavProfile from "./NavProfile";
import { User } from "../../types/typings";

interface Props {
  user: User | null;
}

const NavRight: FC<Props> = props => {
  const router = useRouter();
  const { user } = props;

  return (
    <>
      {router.pathname === "/auth/signup" && (
        <Link href="/auth/signin">
          <a className="text-lg">Sign in</a>
        </Link>
      )}
      {router.pathname === "/auth/signin" && (
        <Link href="/auth/signup">
          <a className="text-lg">Sign Up</a>
        </Link>
      )}
      {router.pathname !== "/auth/signup" &&
        router.pathname !== "/auth/signin" &&
        !user && (
          <Link href="/auth/signin">
            <a className="text-lg">Sign In</a>
          </Link>
        )}
      {router.pathname !== "/auth/signup" &&
        router.pathname !== "/auth/signin" &&
        user && <NavProfile user={user} />}
    </>
  );
};

export default NavRight;
