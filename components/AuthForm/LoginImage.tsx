import React, { FC } from "react";

import Image from "next/image";

const LoginImage: FC = () => {
  return (
    <div className="top-20 md:top-44 lg:top-auto w-52 md:w-80 lg:w-[30rem]">
      <Image
        src={"/assets/images/mountains.png"}
        alt="mountains"
        layout="responsive"
        width={500}
        height={400}
        className=""
      />
    </div>
  );
};

export default LoginImage;
