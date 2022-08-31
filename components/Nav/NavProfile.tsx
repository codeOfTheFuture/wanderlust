import React, { FC, useState } from 'react';
import { useSession } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import NavDropdown from "./NavDropdown";
import { User } from '../../types/typings';

interface Props {
  user: User;
}

const NavProfile: FC<Props> = props => {
  const { user: { name, image } } = props;
  const firstName = name.split(" ")[0];
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);


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
            src={image!}
            width={40}
            height={40}
            alt={firstName}
            className='rounded-full'
          />
        </div>
        <NavDropdown toggleDropdown={toggleDropdown} setToggleDropdown={setToggleDropdown} />
      </div>
    </div>
  )
}

export default NavProfile;