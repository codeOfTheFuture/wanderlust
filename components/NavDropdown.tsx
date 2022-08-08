import NavDropdownLink from "./NavDropdownLink";

interface Props {
  open: boolean;
}

const NavDropdown: React.FC<Props> = props => {
  const { open } = props;

  return (
    <div
      className={`absolute flex flex-col top-12 right-1 w-44 bg-white bg-opacity-60 rounded-sm p-2 mx-1 ${open ? "opacity-100" : "opacity-0"
        }`}
    >
      <NavDropdownLink label="My tours" />
      <NavDropdownLink label="Booked tours" />
      <NavDropdownLink label="Messages" />
      <NavDropdownLink label="Favorites" />
      <NavDropdownLink label="Settings" />
      <NavDropdownLink label="Logout" />
    </div>
  );
};

export default NavDropdown;
