import { useEffect, useState } from "react";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

type HandleScroll = () => void;

const Layout: React.FC<Props> = ({ children }) => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll: HandleScroll = () => {
      setScrollPosition(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <div
      className='relative font-poppins bg-mountain-jump bg-contain bg-no-repeat bg-top h-[1000px] w-full'
    >
      <div className="absolute top-0 left-0 w-full h-[875px] bg-black opacity-50">

      </div>
      <header className="sticky top-0 left-0">
        <Navbar scrollPosition={scrollPosition} />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
