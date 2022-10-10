import React, { FC } from "react";
import Image from "next/image";

const Footer: FC = () => {
  return (
    <footer className="flex justify-between items-center z-5 h-[8vh] w-full p-5 border-y bg-slate-100 border-slate-800">
      <span>&copy; Wanderlust 2022</span>

      <div className="flex gap-6">
        <Image
          src="/assets/images/fb-icon.png"
          alt="Facebook icon"
          width={30}
          height={30}
          className="cursor-pointer"
        />
        <Image
          src="/assets/images/insta-icon.png"
          alt="Instagram icon"
          width={30}
          height={30}
          className="cursor-pointer"
        />
        <Image
          src="/assets/images/twitter-icon.png"
          alt="Twitter icon"
          width={30}
          height={30}
          className="cursor-pointer"
        />
      </div>
    </footer>
  );
};

export default Footer;
