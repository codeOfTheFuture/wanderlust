import React, { FC } from "react";
import Link from "next/link";

const NavLogo: FC = () => {
  return (
    <div>
      <Link href="/">
        <a className="text-xl md:text-2xl font-bold">Wanderlust</a>
      </Link>
    </div>
  );
};

export default NavLogo;
