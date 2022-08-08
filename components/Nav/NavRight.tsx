import React from 'react';
import { useRouter } from "next/router";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import NavProfile from './NavProfile';

const NavRight: React.FC = () => {
  const router = useRouter();
  const { data: session } = useSession<boolean>();

  return (
    <>
      {router.pathname === "/auth/signup" && (
        <Link href='/auth/signin'>
          <a className='text-lg'>Sign in</a>
        </Link>
      )}
      {router.pathname === "/auth/signin" && (
        <Link href='/auth/signup'>
          <a className='text-lg'>Sign Up</a>
        </Link>
      )}
      {router.pathname !== "/auth/signup" &&
        router.pathname !== "/auth/signin" &&
        !session && (
          <Link href='/auth/signin'>
            <a className='text-lg'>Sign In</a>
          </Link>
        )}
      {router.pathname !== "/auth/signup" &&
        router.pathname !== "/auth/signin" &&
        session && (
          <NavProfile />
        )}
    </>
  )
}

export default NavRight;