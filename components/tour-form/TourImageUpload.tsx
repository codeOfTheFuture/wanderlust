import { CameraIcon } from "@heroicons/react/solid";
import React, { FC } from "react";
import { useDispatch } from "react-redux";
import { openModal } from "../../store/slices/modalSlice";

const TourImageUpload: FC = () => {
  const dispatch = useDispatch();

  return (
    <div
      className="flex flex-col justify-center items-center gap-2 cursor-pointer"
      onClick={() => dispatch(openModal(true))}>
      <div className="flex justify-center items-center w-40 h-40 rounded-full bg-slate-200 shadow-md">
        <CameraIcon className="w-20 h-20" />
      </div>
      <p className="text-light-text font-medium">Add Photos</p>
    </div>
  );
};

export default TourImageUpload;
