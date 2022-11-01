import React, { FC } from "react";
import NavLogo from "./NavLogo";
import NavCenter from "./NavCenter";
import NavRight from "./NavRight";
import { useRouter } from "next/router";

interface Props {
  scrollPosition: number;
}

const Navbar: FC<Props> = ({ scrollPosition }) => {
  const router = useRouter();

  return (
    <nav
      className={`fixed w-full h-16 top-0 left-0 px-4 z-50 flex justify-between items-center select-none text-light-text ${
        scrollPosition > 0 || router.pathname === "/search"
          ? "bg-primary-color shadow-xl"
          : "bg-transparent"
      }`}>
      <NavLogo />
      <NavCenter />
      <NavRight />
    </nav>
  );
};

export default Navbar;
