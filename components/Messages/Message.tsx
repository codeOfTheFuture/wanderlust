import React, { FC } from "react";
import { ChatAltIcon } from "@heroicons/react/solid";
import Image from "next/image";

interface Props {
  userImg: string;
}

const Message: FC<Props> = ({ userImg }) => {
  return (
    <div className="w-full flex justify-between items-center bg-transparent border border-secondary-text p-2 cursor-pointer shadow-md hover:scale-105 hover:transition-all duration-300">
      <div className="flex items-center gap-5">
        <ChatAltIcon className="w-10 h-10 text-primary-dark-color" />
        <span>
          <strong>Message with Jeff</strong>
        </span>
      </div>

      {userImg && (
        <div className="relative w-16 h-16 rounded-full">
          <Image
            src={userImg!}
            alt="User Image"
            layout="fill"
            className="rounded-full"
          />
        </div>
      )}
    </div>
  );
};

export default Message;
