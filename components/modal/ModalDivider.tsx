import React, { FC } from "react";

const ModalDivider: FC = () => {
  return (
    <div className="hidden lg:flex justify-evenly items-center gap-2 w-full text-gray-800">
      <div className="w-full h-[2px] bg-gray-800 mt-2"></div>
      <div className="text-2xl font-medium text-center">or</div>
      <div className="w-full h-[2px] bg-gray-800 mt-2"></div>
    </div>
  );
};

export default ModalDivider;
