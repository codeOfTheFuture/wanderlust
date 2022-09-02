import React, { FC } from "react";
import { useEffect, useState } from "react";
import { User, HandleScroll } from "../../types/typings";
import Footer from "../UI/Footer";
import Navbar from "../Nav/Navbar";

interface Props {
  user: User | null;
  children: React.ReactNode;
}

const Layout: FC<Props> = props => {
  const { user, children } = props;
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
      <Navbar user={user} scrollPosition={scrollPosition} />
      <main className="min-h-[92vh]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
