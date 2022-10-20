import React, { FC, useState, useRef } from "react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import Image from "next/image";
import NavDropdown from "./NavDropdown";
import useClickOutside from "../../hooks/useClickOutside";
import { selectUser } from "../../store/slices/userSlice";
import { useAppSelector } from "../../store";

const NavProfile: FC = () => {
  const user = useAppSelector(selectUser),
    firstName = user?.name?.match(/^[^\s]+/)?.join() as string,
    dropsDownRef = useRef<HTMLDivElement>(null),
    [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  useClickOutside(dropsDownRef, () => setToggleDropdown(false));

  return (
    user && (
      <div className="flex justify-center items-center h-full mx-4">
        <div
          className="relative flex justify-center items-center cursor-pointer"
          onClick={() => setToggleDropdown(prevState => !prevState)}
          ref={dropsDownRef}>
          <span>{firstName}</span>
          <ChevronDownIcon className="h-6 mr-2" />
          <div className="flex h-full cursor-pointer rounded-full">
            {user.image && (
              <Image
                src={user.image}
                width={40}
                height={40}
                alt={firstName}
                className="rounded-full"
              />
            )}
          </div>
          <NavDropdown
            toggleDropdown={toggleDropdown}
            setToggleDropdown={setToggleDropdown}
          />
        </div>
      </div>
    )
  );
};

export default NavProfile;
