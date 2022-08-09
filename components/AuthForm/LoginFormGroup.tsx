import React, { FC } from "react";

interface Props {
  id: string;
  text: string;
  type: string;
}

const LoginFormGroup: FC<Props> = props => {
  const { id, text, type } = props;

  return (
    <div className="flex flex-col">
      <label htmlFor={id}>{text}</label>
      <input id={id} type={type} placeholder={text} className="p-2" />
      <hr />
    </div>
  );
};

export default LoginFormGroup;
