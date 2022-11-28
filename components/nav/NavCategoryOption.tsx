import { FC, Fragment } from "react";

interface Props {
  category: string;
  handleClick: () => void;
}

const NavCategoryOption: FC<Props> = ({ category, handleClick }) => {
  return (
    <Fragment>
      <div className="nav-dropdown-link" onClick={handleClick}>
        {category}
      </div>
    </Fragment>
  );
};

export default NavCategoryOption;
