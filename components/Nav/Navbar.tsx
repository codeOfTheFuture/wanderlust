import React, { FC } from "react";
import NavLogo from "./NavLogo";
import NavCenter from "./NavCenter";
import NavRight from "./NavRight";
import { User } from "../../types/typings";

interface Props {
  user?: User | null;
  scrollPosition: number;
}

const Navbar: FC<Props> = props => {
  const { user, scrollPosition } = props;

  return (
    <nav
      className={`fixed w-full top-0 left-0 px-4 py-2 z-50 flex justify-between items-center select-none text-light-text ${
        scrollPosition > 0 ? "bg-primary-color shadow-xl" : "bg-transparent"
      }`}
    >
      <NavLogo />
      <NavCenter />
      <NavRight user={user!} />
    </nav>
  );
};

export default Navbar;
