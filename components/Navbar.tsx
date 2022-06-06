import Link from "next/link";
import { ChevronDownIcon, SearchIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import Image from "next/image";
import NavDropdown from "./NavDropdown";
import { useState } from "react";

interface Props {
  scrollPosition: number;
}

type User = {
  name: string;
  email: string;
  image: string;
};

const Navbar: React.FC<Props> = props => {
  const [profileDropdownOpen, setProfileDropdownOpen] =
    useState<boolean>(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] =
    useState<boolean>(false);
  const { scrollPosition } = props;
  const router = useRouter();
  const { data: session } = useSession<boolean>(),
    user = session?.user as User,
    name = user?.name as string,
    image = user?.image as string,
    firstName: string = name?.split(" ")[0];

  const profileLinks = [
    "My tours",
    "Booked tours",
    "Messages",
    "Favorites",
    "Settings",
    "Logout",
  ];

  return (
    <nav
      className={`fixed w-full top-0 left-0 z-50 flex justify-between items-center select-none text-white ${scrollPosition > 0 ? "bg-[#4285F4] shadow-xl" : "bg-transparent"
        }`}
    >
      <div>
        <Link href='/'>
          <a className='text-xl md:text-2xl font-bold m-4'>Wanderlust</a>
        </Link>
      </div>

      {router.pathname !== "/auth/signup" &&
        router.pathname !== "/auth/signin" && (
          <div className='hidden md:inline-flex md:m-4'>
            <ul className='flex justify-around items-center gap-8 text-xl'>
              <li className='hover:cursor-pointer'>Popular</li>
              <li className='hover:cursor-pointer'>Deals</li>
              <li className='flex items-center hover:cursor-pointer'>
                Categories
                <ChevronDownIcon className='w-6' />
              </li>
            </ul>
          </div>
        )}

      {router.pathname === "/auth/signup" && (
        <Link href='/auth/signin'>
          <a className='text-lg'>Sign in</a>
        </Link>
      )}
      {router.pathname === "/auth/signin" && (
        <Link href='/auth/signup'>
          <a className='text-lg'>Sign up</a>
        </Link>
      )}
      {router.pathname !== "/auth/signup" &&
        router.pathname !== "/auth/signin" &&
        !session && (
          <Link href='/auth/signin'>
            <a className='text-lg'>Sign in</a>
          </Link>
        )}
      {router.pathname !== "/auth/signup" &&
        router.pathname !== "/auth/signin" &&
        session && (
          <div className='flex justify-center items-center h-full mx-4'>
            <SearchIcon className='h-5 mr-4 cursor-pointer' />
            <div
              className='relative flex justify-center items-center cursor-pointer'
              onClick={() => setProfileDropdownOpen(prevState => !prevState)}
            >
              <span>{firstName}</span>
              <ChevronDownIcon className='h-6 mr-2' />
              <div className='flex h-full cursor-pointer rounded-full'>
                <Image
                  src={image}
                  width={40}
                  height={40}
                  alt={name}
                  className='rounded-full'
                />
              </div>
              <NavDropdown dropdownLinks={profileLinks} open={profileDropdownOpen} />
            </div>
          </div>
        )}
    </nav>
  );
};

export default Navbar;
