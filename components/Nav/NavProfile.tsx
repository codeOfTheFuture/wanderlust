import React, { FC, useState, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Image from "next/image";
import NavDropdown from "./NavDropdown";
import useClickOutside from "../../hooks/useClickOutside";
import { selectUser } from "../../store/slices/userSlice";
import { useAppSelector } from "../../store";
import NavDropdownLink from "./NavDropdownLink";
import { signOut } from "next-auth/react";

const NavProfile: FC = () => {
  const user = useAppSelector(selectUser),
    firstName = user?.name?.match(/^[^\s]+/)?.join() as string,
    dropsDownRef = useRef<HTMLDivElement>(null),
    [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  useClickOutside(dropsDownRef, () => setToggleDropdown(false));

  const logOut = () => {
    signOut();
    setToggleDropdown(false);
  };

  return (
    user && (
      <div className="flex justify-center items-center h-full mx-4">
        <div
          className="relative flex justify-center items-center cursor-pointer"
          onClick={() => setToggleDropdown(prevState => !prevState)}
          ref={dropsDownRef}>
          <span>{firstName || user.email}</span>
          <ChevronDownIcon
            className={`h-6 mr-2 transition-transform duration-300 ease-in-out ${
              toggleDropdown ? "-rotate-180" : "rotate-0"
            }`}
          />
          <div className="flex h-full cursor-pointer rounded-full">
            <Image
              src={user.profileImage.secure_url}
              width={40}
              height={40}
              alt={firstName}
              className="rounded-full"
            />
          </div>
          <NavDropdown toggleDropdown={toggleDropdown}>
            <NavDropdownLink label="Create Tour" link="/create-tour" />
            <NavDropdownLink label="Offered Tours" link="/offered-tours" />
            <NavDropdownLink label="Booked Tours" link="/booked-tours" />
            <NavDropdownLink label="Messages" link="/messages" />
            <NavDropdownLink label="Favorites" link="/favorite-tours" />
            <NavDropdownLink label="Settings" link="/settings" />
            <div className="nav-dropdown-link" onClick={logOut}>
              Logout
            </div>
          </NavDropdown>
        </div>
      </div>
    )
  );
};

export default NavProfile;
