import { Dispatch, FC, KeyboardEvent, SetStateAction, useState } from "react";

interface Props {
  name: "description" | "what-to-bring";
  label: string;
  formId: string;
  value: string;
  handleChange: Dispatch<SetStateAction<string>>;
}

const FormTextArea: FC<Props> = ({
  name,
  label,
  formId,
  value,
  handleChange,
}) => {
  const bulletPoint = "• ";

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (name === "what-to-bring" && e.key === "Enter") {
      e.stopPropagation();
      e.preventDefault();

      handleChange(prevState => prevState + "\n" + bulletPoint);
    }
  };

  return (
    <div className="flex flex-col w-full relative">
      <textarea
        name={name}
        id={name}
        className="block bg-transparent focus:border-none rounded-lg p-3 text-xl text-black border border-gray-500 focus:outline-primary-color peer w-full h-40 resize-none"
        required
        form={formId}
        value={value}
        onChange={e =>
          handleChange(prevState => {
            if (prevState === "" && name === "what-to-bring") {
              return bulletPoint + e.target.value;
            } else {
              return e.target.value;
            }
          })
        }
        onKeyDown={handleKeyDown}></textarea>
      <label
        htmlFor={name}
        className="absolute top-4 left-1 px-2 text-lg leading-none min-w-[5px] pointer-events-none text-gray-500 transition-all duration-200 rounded-lg peer-focus:-translate-y-[1.6rem] peer-focus:text-sm peer-focus:translate-x-3 peer-focus:bg-white peer-focus:text-primary-color peer-valid:-translate-y-[1.6rem] peer-valid:text-sm peer-valid:translate-x-3 peer-valid:bg-white">
        {label}
      </label>
    </div>
  );
};

export default FormTextArea;
