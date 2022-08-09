import Link from "next/link";
import React from "react";

interface Props {
  label: string;
  link: string;
}

const NavDropdownLink: React.FC<Props> = props => {
  const { label, link } = props;

  return (
    <Link href={link!}>
      <a className="nav-dropdown-link">{label}</a>
    </Link>
  );
};

export default NavDropdownLink;
