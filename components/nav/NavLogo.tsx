import React, { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const NavLogo: FC = () => {
  const router = useRouter();

  return (
    <div>
      <Link href="/" legacyBehavior>
        <a className="text-xl md:text-2xl font-bold">Wanderlust</a>
      </Link>
    </div>
  );
};

export default NavLogo;
