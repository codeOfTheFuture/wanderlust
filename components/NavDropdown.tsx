import NavDropdownLink from "./NavDropdownLink";

interface Props {
  dropdownLinks: string[];
  open: boolean;
}

const NavDropdown: React.FC<Props> = (props) => {
  const { dropdownLinks, open } = props;


  return (
    <div className={`absolute flex flex-col gap-1 top-12 right-1 w-44 bg-white bg-opacity-60 rounded-sm p-2 mx-1 ${open ? 'opacity-100' : 'opacity-0'}`}>
      {dropdownLinks.map((link, index) => (
        <NavDropdownLink key={index} link={link} />
      ))
      }
    </div>
  )
}

export default NavDropdown;