import Link from "next/link";
import { useState } from "react";

interface Props {
  pageScroll: boolean;
}

const Navbar: React.FC<Props> = (props) => {
  const { pageScroll } = props;
  console.log(pageScroll);

  return (
    <nav className={`sticky top-0 left-0 flex justify-between items-center p-4 text-white ${pageScroll ? "bg-transparent" : "bg-[#4285F4]"}`}>
      <div>
        <Link href='/'>
          <a className='text-xl'>Wanderlust</a>
        </Link>
      </div>

      <div>
        <ul className='flex justify-around items-center gap-8'>
          <li className='hover:cursor-pointer'>Popular</li>
          <li className='hover:cursor-pointer'>Deals</li>
          <li className='hover:cursor-pointer'>Categories</li>
        </ul>
      </div>

      <div>
        <p className='hover:cursor-pointer'>Emilia</p>
      </div>
    </nav>
  );
};

export default Navbar;
