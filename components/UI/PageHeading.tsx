import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../../store/slices/userSlice";

interface Props {
  headingText: string;
}

const PageHeading: FC<Props> = ({ headingText }) => {
  const user = useSelector(selectUser);

  return (
    <section className="relative w-full h-[50vh] bg-running-in-forest bg-cover bg-center bg-no-repeat flex items-end shadow-xl">
      <div className="absolute w-full h-full bg-black opacity-70"></div>
      <div className="flex items-end w-full h-full p-10 z-10">
        <h1 className=" text-light-text text-2xl md:text-4xl xl:text-6xl md:w-full font-semibold">
          Hi {user?.name.split(" ")[0]},
          <br />
          {headingText}
        </h1>
      </div>
    </section>
  );
};

export default PageHeading;
