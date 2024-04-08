import { useState } from 'react';
import { Link } from 'react-router-dom';

const linksData = [{ to: '/', text: 'Dashboard' }];

const Header = () => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <>
      <nav className='bg-gray-800'>
        <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <div className='flex h-16 items-center justify-between'>
            <div className='flex items-center'>
              <div className='flex-shrink-0'>
                <img
                  className='h-8 w-8'
                  src='https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=500'
                  alt='Your Company'
                />
              </div>
              <div className='hidden md:block'>
                <div className='ml-10 flex items-baseline space-x-4'>
                  {linksData.map((link) => (
                    <Link
                      to={link.to}
                      key={link.text}
                      className='text-white rounded-md px-3 py-2 text-sm font-medium'
                    >
                      {link.text}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
            <div className='hidden md:block'>
              <div className='ml-4 flex items-center md:ml-6'>
                <div className='relative ml-3'>
                  <div>
                    <button
                      onClick={toggleUserMenu}
                      type='button'
                      className='relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800'
                      id='user-menu-button'
                      aria-expanded='false'
                      aria-haspopup='true'
                    >
                      <span className='absolute -inset-1.5'></span>
                      <span className='sr-only'>Open user menu</span>
                      <img
                        className='h-8 w-8 rounded-full'
                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt=''
                      />
                    </button>
                  </div>

                  {isUserMenuOpen && (
                    <div
                      className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'
                      role='menu'
                      aria-orientation='vertical'
                      aria-labelledby='user-menu-button'
                    >
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700'
                        role='menuitem'
                        id='user-menu-item-0'
                      >
                        Your Profile
                      </a>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700'
                        role='menuitem'
                        id='user-menu-item-1'
                      >
                        Settings
                      </a>
                      <a
                        href='#'
                        className='block px-4 py-2 text-sm text-gray-700'
                        role='menuitem'
                        id='user-menu-item-2'
                      >
                        Sign out
                      </a>
                    </div>
                  )}
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