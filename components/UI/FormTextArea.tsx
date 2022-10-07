import {
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
  useRef,
  useState,
} from "react";

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
  const bullet_point = "•",
    text = useRef<HTMLTextAreaElement>(null);

  const [focused, setFocused] = useState<boolean>(false);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (name === "what-to-bring" && e.key === "Enter") {
      e.stopPropagation();
      e.preventDefault();
      text!.current!.value = `${text.current?.value}\n${" " + bullet_point} `;
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
        form={formId}
        value={value}
        onChange={e => handleChange(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        defaultValue={
          name === "what-to-bring" && focused ? ` ${bullet_point} ` : ""
        }></textarea>
    </div>
  );
};

export default FormTextArea;
