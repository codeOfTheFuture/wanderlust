import { useEffect, useState } from "react";
import Footer from "./Footer";
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
      className='relative font-poppins bg-mountain-jump bg-cover bg-top bg-no-repeat w-full h-[80vh]'
    >
      <div className="absolute top-0 left-0 w-full h-[80vh] bg-black opacity-60">
      </div>

      <Navbar scrollPosition={scrollPosition} />

      <main className="flex flex-col items-center justify-center w-full md:w-3/4 mx-auto">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
