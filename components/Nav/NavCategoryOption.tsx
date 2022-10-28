import { FC } from "react";

interface Props {
  category: string;
}

const NavCategoryOption: FC<Props> = ({ category }) => {
  return (
    <>
      <div className="nav-dropdown-link">{category}</div>
    </>
  );
};

export default NavCategoryOption;
