import Link from 'next/link'
import React from 'react'

interface Props {
  link: string;
}

const NavDropdownLink: React.FC<Props> = (props) => {
  const { link } = props;

  return (
    <Link href={link}>
      <a className='flex justify-center py-2 border-y text-slate-800 w-full cursor-pointer hover:bg-slate-100'>{link}</a>
    </Link>
  )
}

export default NavDropdownLink;