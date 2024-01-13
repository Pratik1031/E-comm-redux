import React from 'react';
import logo from '../../Assets/logo.png';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <div className='flex justify-between px-2 bg-white items-center sticky text-sm top-0 z-10 drop-shadow-sm h-[60px]'>
      <Link to='/'>
        <div>
          <img src={logo} alt='store/img' className='w-full h-20' />
        </div>
      </Link>
      <h2 className='text-2xl text-center'>E-comm Store</h2>
      <div className='flex justify-around gap-10  mr-4 items-center'>
        <Link to='/cart'>
          <div className='flex flex-row items-center cursor-pointer'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='w-6 h-6'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
              />
            </svg>
            <p className='ml-2'>Cart</p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
