import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  value: string;
  handleChange: Dispatch<SetStateAction<string>>;
}

const TourTitleInput: FC<Props> = ({ value, handleChange }) => {
  return (
    <div className="flex flex-col w-full bg-slate-100 rounded-sm">
      <label htmlFor="tourTitle">Title your tour</label>
      <input
        type="text"
        name="tourTitle"
        id="tourTitle"
        placeholder="Title your tour"
        className="p-5 bg-transparent text-lg text-black"
        value={value}
        onChange={e => handleChange(e.target.value)}
      />
    </div>
  );
};

export default TourTitleInput;
