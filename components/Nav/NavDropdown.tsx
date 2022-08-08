import { signOut } from "next-auth/react";
import NavDropdownLink from "./NavDropdownLink";

interface Props {
  toggleDropdown: boolean;
  setToggleDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavDropdown: React.FC<Props> = props => {
  const { toggleDropdown, setToggleDropdown } = props;

  const logOut = () => {
    signOut();
    setToggleDropdown(false);
  };

  return (
    <div
      className={`absolute flex flex-col top-12 right-1 w-44 bg-white bg-opacity-60 rounded-sm p-2 mx-1 ${toggleDropdown ? "opacity-100" : "opacity-0"
        }`}
    >
      <NavDropdownLink label="My tours" />
      <NavDropdownLink label="Booked tours" />
      <NavDropdownLink label="Messages" />
      <NavDropdownLink label="Favorites" />
      <NavDropdownLink label="Settings" />
      <div className="nav-dropdown-link" onClick={logOut}>
        Logout
      </div>
    </div>
  );
};

export default NavDropdown;
