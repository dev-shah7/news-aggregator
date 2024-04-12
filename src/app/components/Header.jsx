import { useState } from 'react';
import { Link } from 'react-router-dom';

import Logo from '../assets/app-logo.png';

const linksData = [
  { to: '/', text: 'Dashboard' },
  { to: '/blogs', text: 'News Feed' },
];

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <>
      <nav className='bg-[#DDDBCB] text-slate-800'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-1'>
          <div className='flex h-16 items-center justify-between'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <img
                  className='h-[120px] w-[150px]'
                  src={Logo}
                  alt='Your Company'
                />
              </div>
              <div className='hidden md:block'>
                <div className='ml-10 flex items-baseline space-x-4'>
                  {linksData.map((link) => (
                    <Link
                      to={link.to}
                      key={link.text}
                      className='rounded-md px-3 py-2 text-sm font-medium'
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className='-mr-2 flex md:hidden'>
              <button
                type='button'
                onClick={toggleNav}
                className='relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                aria-controls='mobile-menu'
              >
                <span className='absolute -inset-0.5'></span>
                <span className='sr-only'>Open main menu</span>
                <svg
                  className='block h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5' />
                </svg>
                <svg
                  className='hidden h-6 w-6'
                  fill='none'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  aria-hidden='true'
                >
                  <path d='M6 18L18 6M6 6l12 12' />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div
          className={`md:hidden ${isNavOpen ? 'block' : 'hidden'}`}
          id='mobile-menu'
        >
          <div className='space-y-1 px-2 pb-3 pt-2 sm:px-3'>
            {linksData.map((link) => (
              <a
                key={link.text}
                href={link.to}
                className='text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium'
              >
                {link.text}
              </a>
            ))}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
