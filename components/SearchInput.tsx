import React, { FC } from "react";

const SearchInput: FC = () => {
  return (
    <div className="absolute -bottom-[2.4rem] flex w-full h-16 sm:h-20 shadow-md">
      <input
        type="text"
        className="relative w-full h-full pl-10 pr-[48rem] text-lg border border-primary-text focus:outline-none"
      />
      <div className="absolute top-2 right-2 flex justify-center items-center cursor-default w-20 h-12 sm:w-32 sm:h-16 bg-primary-color text-light-text text-lg border border-primary-text">
        Search
      </div>
    </div>
  );
};

export default SearchInput;
