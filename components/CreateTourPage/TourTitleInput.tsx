import React, { FC } from "react";

const TourTitleInput: FC = () => {
  return (
    <div className="flex flex-col w-full bg-slate-100 rounded-sm">
      <label htmlFor="tourTitle">Title your tour</label>
      <input
        type="text"
        name="tourTitle"
        id="tourTitle"
        placeholder="Title your tour"
        className="p-5 bg-transparent text-lg text-light-text"
      />
    </div>
  );
};

export default TourTitleInput;
