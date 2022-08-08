import Link from 'next/link';
import React from 'react'

const NavLogo: React.FC = () => {
  return (
    <div>
      <Link href='/'>
        <a className='text-xl md:text-2xl font-bold'>Wanderlust</a>
      </Link>
    </div>
  )
}

export default NavLogo;