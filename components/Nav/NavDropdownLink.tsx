import React, { FC } from "react";
import Link from "next/link";

interface Props {
  label: string;
  link: string;
}

const NavDropdownLink: FC<Props> = props => {
  const { label, link } = props;

  return (
    <Link href={link!}>
      <a className="nav-dropdown-link">{label}</a>
    </Link>
  );
};

export default NavDropdownLink;
