import { FC, ReactNode } from "react";
import { Combobox } from "@headlessui/react";

interface Props {
  children: ReactNode;
  comboboxOptionsStyles: string;
}

const ComboboxOptions: FC<Props> = ({ children, comboboxOptionsStyles }) => {
  return (
    <Combobox.Options as="ul" className={comboboxOptionsStyles}>
      {children}
    </Combobox.Options>
  );
};

export default ComboboxOptions;
