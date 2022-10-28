import { FC } from "react";

interface Props {
  category: string;
  handleClick: () => void;
}

const NavCategoryOption: FC<Props> = ({ category, handleClick }) => {
  return (
    <>
      <div className="nav-dropdown-link" onClick={handleClick}>
        {category}
      </div>
    </>
  );
};

export default NavCategoryOption;
