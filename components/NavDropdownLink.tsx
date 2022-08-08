import Link from 'next/link'
import React from 'react'

interface Props {
  label: string;
}

const NavDropdownLink: React.FC<Props> = props => {
  const { label } = props;

  return (
    <Link href={label}>
      <a className='flex justify-center py-2 border-y text-slate-800 w-full cursor-pointer hover:bg-slate-100'>{label}</a>
    </Link>
  )
}

export default NavDropdownLink;