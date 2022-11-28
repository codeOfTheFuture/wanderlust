import React, { FC } from "react";
import Link from "next/link";

interface Props {
  label: string;
  link: string;
}

const NavDropdownLink: FC<Props> = ({ label, link }) => {
  return (
    <Link href={link as string} legacyBehavior>
      <a className="nav-dropdown-link">{label}</a>
    </Link>
  );
};

export default NavDropdownLink;
