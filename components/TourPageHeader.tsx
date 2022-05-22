import Image from "next/image";

interface Props {
  backgroundImage: string;
  title: string;
}

const TourPageHeader: React.FC<Props> = ({ backgroundImage, title }) => {
  return (
    <header className="relative w-full h-[50vh]">
      <Image src={backgroundImage} alt={title} layout='fill' className="object-cover object-center" />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute inset-0 flex flex-col gap-4 items-start justify-center text-white">
        <h1 className="text-4xl font-bold ml-32">
          {title}
        </h1>
        <button className="text-lg font-semibold px-5 py-2 bg-[#4285F4] ml-32">View Images</button>
      </div>
    </header>
  )
}

export default TourPageHeader;