import Link from "next/link";
import { ChevronDownIcon } from "@heroicons/react/solid";

interface Props {
  scrollPosition: number;
}

const Navbar: React.FC<Props> = (props) => {
  const { scrollPosition } = props;
  console.log(scrollPosition);

  return (
    <nav className={`flex justify-between items-center p-4 text-white z-50 ${scrollPosition ? "bg-[#4285F4]" : "bg-transparent"}`}>
      <div>
        <Link href='/'>
          <a className='text-2xl font-bold'>Wanderlust</a>
        </Link>
      </div>

      <div>
        <ul className='flex justify-around items-center gap-8 text-xl'>
          <li className='hover:cursor-pointer'>Popular</li>
          <li className='hover:cursor-pointer'>Deals</li>
          <li className='flex items-center hover:cursor-pointer'>Categories
            <ChevronDownIcon className="w-6" />
          </li>
        </ul>
      </div>

      <div>
        <p className='hover:cursor-pointer text-xl '>Emilia</p>
      </div>
    </nav>
  );
};

export default Navbar;
