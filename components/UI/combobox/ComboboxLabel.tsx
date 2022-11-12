import { FC, ReactNode } from "react";
import { Combobox } from "@headlessui/react";

interface Props {
  children: ReactNode;
  comboboxLabelStyles: string;
}

const ComboboxLabel: FC<Props> = ({ children, comboboxLabelStyles }) => {
  return (
    <Combobox.Label as="label" className={comboboxLabelStyles}>
      {children}
    </Combobox.Label>
  );
};

export default ComboboxLabel;
