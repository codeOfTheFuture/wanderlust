import React, { FC } from "react";
import { useEffect, useState } from "react";
import { HandleScroll } from "../../types/typings";
import Footer from "../Footer";
import Navbar from "../Nav/Navbar";

interface Props {
  children: React.ReactNode;
}



const Layout: FC<Props> = ({ children }) => {
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
    <>
      <Navbar scrollPosition={scrollPosition} />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
