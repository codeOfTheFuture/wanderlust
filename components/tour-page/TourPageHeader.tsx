import React, { FC } from "react";
import Image from "next/image";
import Button from "../ui/Button";

interface Props {
  backgroundImage: string;
  title: string;
}

const TourPageHeader: FC<Props> = ({ backgroundImage, title }) => {
  return (
    <header className="relative flex justify-center items-center w-full h-[50vh]">
      <Image
        src={backgroundImage}
        alt={title}
        layout="fill"
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute lg:top-40 lg:left-60 flex flex-col gap-4 items-start">
        <h1 className="text-4xl font-bold text-light-text">{title}</h1>
        <Button color="btn-primary" size="btn-lg" type="button">
          View Images
        </Button>
      </div>
    </header>
  );
};

export default TourPageHeader;
