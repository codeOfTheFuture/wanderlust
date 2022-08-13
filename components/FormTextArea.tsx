import React, { FC, useRef } from "react";

interface Props {
  name: "description" | "what-to-bring";
  label: string;
}

const FormTextArea: FC<Props> = props => {
  const { name, label } = props;
  const text = useRef<HTMLTextAreaElement>(null);
  const BulletPoint = "•";

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((name === "what-to-bring" && e.key) === "Enter") {
      text!.current!.value = `${text.current?.value}\n${" " + BulletPoint} `;
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <div className="flex flex-col">
      <label htmlFor={name} hidden>{label}</label>
      <textarea
        name={name}
        id={name}
        cols={50}
        rows={6}
        placeholder={label}
        className="border border-blue-500"
        ref={text}
        onKeyDown={handleKeyDown}
      >
        {name === "what-to-bring" ? " " + BulletPoint + " " : ""}
      </textarea>
    </div>
  );
};

export default FormTextArea;
