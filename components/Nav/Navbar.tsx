import React from "react";
import NavLogo from "./NavLogo";
import NavCenter from "./NavCenter";
import NavRight from "./NavRight";

interface Props {
  scrollPosition: number;
}

const Navbar: React.FC<Props> = props => {
  const { scrollPosition } = props;

  return (
    <nav
      className={`fixed w-full top-0 left-0 px-4 py-2 z-50 flex justify-between items-center select-none text-white ${scrollPosition > 0 ? "bg-[#4285F4] shadow-xl" : "bg-transparent"
        }`}
    >
      <NavLogo />
      <NavCenter />
      <NavRight />
    </nav>
  );
};

export default Navbar;
