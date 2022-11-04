import { Dispatch, FC, SetStateAction } from "react";

interface Props {
  value: string;
  handleChange: Dispatch<SetStateAction<string>>;
}

const TourTitleInput: FC<Props> = ({ value, handleChange }) => {
  return (
    <div className="form-control rounded-lg relative">
      <input
        type="text"
        name="tourTitle"
        id="tourTitle"
        required
        className="form-input bg-white peer"
        value={value}
        onChange={e => handleChange(e.target.value)}
      />
      <label
        htmlFor="tourTitle"
        className="form-label rounded-lg peer-focus:-translate-y-[1.6rem] peer-focus:text-sm peer-focus:translate-x-2 peer-focus:bg-white peer-focus:text-primary-color peer-valid:-translate-y-[1.6rem] peer-valid:text-sm peer-valid:translate-x-2 peer-valid:bg-white">
        Title your tour
      </label>
    </div>
  );
};

export default TourTitleInput;
