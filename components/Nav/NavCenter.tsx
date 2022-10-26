import React, { FC, useState } from "react";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@heroicons/react/solid";

const NavCenter: FC = () => {
  const router = useRouter();

  return (
    <>
      {router.pathname === "/" && (
        <ul className="hidden md:flex justify-around items-center gap-8 h-full text-xl">
          <li className="pb-1 hover:cursor-pointer">Popular</li>
          <li className="pb-1 hover:cursor-pointer">Deals</li>
          <li className="flex items-center hover:cursor-pointer">
            Categories
            <ChevronDownIcon className="w-6" />
          </li>
        </ul>
      )}
    </>
  );
};

export default NavCenter;
