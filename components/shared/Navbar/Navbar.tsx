import React from 'react';
import ModeToggle from '../ModeToggle';
import Link from 'next/link';
import { CodeIcon } from 'lucide-react';
import { SignedIn, UserButton } from '@clerk/nextjs';
import DashboardButton from '../DashboardButton';

const Navbar = () => {
  return (
    <nav className='border-b'>
      <div className='flex h-16 items-center px-4 container mx-auto'>
        <Link
          href='/'
          className='flex items-center gap-2 font-semibold text-3xl font-mono hover:opacity-80 transition-opacity'
        >
          <CodeIcon className='size-8 text-emerald-500' />
          <span className='bg-linear-to-r  from bg-emerald-600 to teal-600 bg-clip-text text-transparent'>
            CodeSync
          </span>
        </Link>
        <SignedIn>
          <div className='flex items-center space-x-4 ml-auto'>
            <DashboardButton />
            <ModeToggle />
            <UserButton />
          </div>
        </SignedIn>
      </div>
    </nav>
  );
};

export default Navbar;
