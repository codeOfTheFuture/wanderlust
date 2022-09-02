import React, { FC } from "react";
import { User } from "../../types/typings";

interface Props {
  user: User | null;
  headingText: string;
}

const PageHeading: FC<Props> = ({ user, headingText }) => {
  return (
    <section className="relative w-full h-[50vh] bg-running-in-forest bg-cover bg-center bg-no-repeat flex items-end shadow-xl">
      <div className="absolute w-full h-full bg-black opacity-70"></div>
      <div className="flex items-end w-full h-full p-10 z-10">
        <h1 className=" text-light-text  text-4xl xl:text-6xl md:w-full font-semibold">
          Hi {user?.name.split(" ")[0]},
          <br />
          {headingText}
        </h1>
      </div>
    </section>
  );
};

export default PageHeading;
