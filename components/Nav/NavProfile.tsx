import React, { useState } from 'react';
import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import NavDropdown from "./NavDropdown";


type User = {
  name: string;
  email: string;
  image: string;
};

const NavProfile: React.FC = () => {
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

  const { data: session } = useSession<boolean>(),
    user = session?.user as User,
    name = user?.name,
    image = user?.image,
    firstName = name?.split(" ")[0];

  return (
    <div className='flex justify-center items-center h-full mx-4'>
      <div
        className='relative flex justify-center items-center cursor-pointer'
        onClick={() => setToggleDropdown(prevState => !prevState)}
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
        <NavDropdown toggleDropdown={toggleDropdown} setToggleDropdown={setToggleDropdown} />
      </div>
    </div>
  )
}

export default NavProfile;