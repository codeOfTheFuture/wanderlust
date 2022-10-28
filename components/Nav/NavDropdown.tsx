import { FC, ReactNode } from "react";

interface Props {
  children: ReactNode;
  toggleDropdown: boolean;
}

const NavDropdown: FC<Props> = ({ children, toggleDropdown }) => {
  return (
    <div
      className={`absolute flex flex-col top-12 right-0 w-52 bg-white rounded-md p-3 mx-1 shadow-xl transition-opacity duration-150 ease-in-out ${
        toggleDropdown
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}>
      {children}
    </div>
  );
};

export default NavDropdown;
