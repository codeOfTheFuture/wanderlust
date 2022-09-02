import React, { FC, KeyboardEvent, useRef } from "react";

interface Props {
  name: "description" | "what-to-bring";
  label: string;
}

const FormTextArea: FC<Props> = props => {
  const { name, label } = props,
    Bullet_Point = "•",
    text = useRef<HTMLTextAreaElement>(null);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (name === "what-to-bring" && e.key === "Enter") {
      e.stopPropagation();
      e.preventDefault();
      text!.current!.value = `${text.current?.value}\n${" " + Bullet_Point} `;
    }
  };

  return (
    <div className="flex flex-col w-full">
      <label htmlFor={name} hidden>
        {label}
      </label>
      <textarea
        name={name}
        id={name}
        placeholder={label}
        className="block border border-blue-500 w-full h-40 resize-none"
        ref={text}
        onKeyDown={handleKeyDown}>
        {name === "what-to-bring" ? ` ${Bullet_Point} ` : ""}
      </textarea>
    </div>
  );
};

export default FormTextArea;
