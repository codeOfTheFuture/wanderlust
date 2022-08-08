import React from "react";
import { useRouter } from "next/router";
import { ChevronDownIcon } from "@heroicons/react/solid";

const NavCenter: React.FC = () => {
  const router = useRouter();

  return (
    <>
      {router.pathname === "/" && (
        <div className="hidden md:inline-flex md:m-4">
          <ul className="flex justify-around items-center gap-8 text-xl">
            <li className="hover:cursor-pointer">Popular</li>
            <li className="hover:cursor-pointer">Deals</li>
            <li className="flex items-center hover:cursor-pointer">
              Categories
              <ChevronDownIcon className="w-6" />
            </li>
          </ul>
        </div>
      )}
    </>
  );
};

export default NavCenter;
