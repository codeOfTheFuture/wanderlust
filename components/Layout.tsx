import { useState } from "react";
import Navbar from "./Navbar";

interface Props {
  children: React.ReactNode;
}

type ScrollEvent = React.UIEvent<Element, UIEvent>;
type HandleScroll = (event: ScrollEvent) => void;

const Layout: React.FC<Props> = ({ children }) => {
  const [pageScroll, setPageScroll] = useState<boolean>(false);

  const handleScroll: HandleScroll = () => {
    if (window.scrollY > 0) {
      setPageScroll(true);
    } else {
      setPageScroll(false);
    }
  };

  return (
    <div
      className='font-poppins bg-mountain-jump bg-contain bg-no-repeat bg-top h-screen'
      onScroll={handleScroll}
    >
      <Navbar pageScroll={pageScroll} />
      <main>{children}</main>
    </div>
  );
};

export default Layout;
