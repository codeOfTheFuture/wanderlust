import React, { FC } from "react";

interface Props {
  label: string;
  placeholder: string;
}

const FormTextArea: FC<Props> = props => {
  const { label, placeholder } = props;

  return (
    <div>
      <label htmlFor="">{label}</label>
      <textarea
        name=""
        id=""
        cols={30}
        rows={10}
        placeholder={placeholder}
      ></textarea>
    </div>
  );
};

export default FormTextArea;
