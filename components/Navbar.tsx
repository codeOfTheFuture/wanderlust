import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/solid";

interface Props {
  scrollPosition: number;
}

const Navbar: React.FC<Props> = (props) => {
  const { scrollPosition } = props;

  return (
    <nav className={`fixed w-full top-0 left-0 z-50 flex justify-between items-center p-4 text-white ${scrollPosition > 0 ? "bg-[#4285F4] shadow-xl" : "bg-transparent"}`}>
      <div>
        <Link href='/'>
          <a className='text-xl md:text-2xl font-bold'>Wanderlust</a>
        </Link>
      </div>

      <div className="hidden md:inline-flex">
        <ul className='flex justify-around items-center gap-8 text-xl'>
          <li className='hover:cursor-pointer'>Popular</li>
          <li className='hover:cursor-pointer'>Deals</li>
          <li className='flex items-center hover:cursor-pointer'>Categories
            <ChevronDownIcon className="w-6" />
          </li>
        </ul>
      </div>

      <div>
        <p className='hover:cursor-pointer text-lg md:text-xl '>Emilia</p>
      </div>
    </nav>
  );
};

export default Navbar;
