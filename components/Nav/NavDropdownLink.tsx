import Link from "next/link";
import React from "react";

interface Props {
  label: string;
}

const NavDropdownLink: React.FC<Props> = props => {
  const { label } = props;

  return (
    <Link href={label}>
      <a className="nav-dropdown-link">{label}</a>
    </Link>
  );
};

export default NavDropdownLink;
