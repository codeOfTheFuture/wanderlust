import React, { FC } from "react";
import { useEffect, useState } from "react";
import { HandleScroll } from "../../types/typings";
import Footer from "../ui/Footer";
import Navbar from "../nav/Navbar";

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
    <div className="min-h-screen">
      <Navbar scrollPosition={scrollPosition} />
      <main className="min-h-[92vh]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
