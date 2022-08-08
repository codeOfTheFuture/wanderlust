import { useEffect, useState } from "react";
import Footer from "../Footer";
import Navbar from "../Nav/Navbar";

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
    <div>
      <Navbar scrollPosition={scrollPosition} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
