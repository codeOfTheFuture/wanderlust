import React, { FC } from "react";
import { signOut } from "next-auth/react";
import NavDropdownLink from "./NavDropdownLink";

interface Props {
  toggleDropdown: boolean;
  setToggleDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavDropdown: FC<Props> = props => {
  const { toggleDropdown, setToggleDropdown } = props;

  const logOut = () => {
    signOut();
    setToggleDropdown(false);
  };

  return (
    <div
      className={`absolute flex flex-col top-12 right-1 w-52 bg-white rounded-md p-3 mx-1 shadow-xl transition-opacity duration-150 ease-in-out ${
        toggleDropdown ? "opacity-100" : "opacity-0"
      }`}
    >
      <NavDropdownLink label="Create Tour" link="/create-tour" />
      <NavDropdownLink label="Offered Tours" link="/offered-tours" />
      <NavDropdownLink label="Booked Tours" link="/booked-tours" />
      <NavDropdownLink label="Messages" link="/messages" />
      <NavDropdownLink label="Favorites" link="/favorites" />
      <NavDropdownLink label="Settings" link="/settings" />
      <div className="nav-dropdown-link" onClick={logOut}>
        Logout
      </div>
    </div>
  );
};

export default NavDropdown;
