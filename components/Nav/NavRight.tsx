import React, { FC } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import NavProfile from "./NavProfile";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";

const NavRight: FC = () => {
  const user = useSelector(selectUser),
    router = useRouter();

  console.log(user);

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
        user && <NavProfile />}
    </>
  );
};

export default NavRight;
