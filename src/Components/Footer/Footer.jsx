import React from 'react';
import logo from '../../Assets/logo.png';
import facebook from '../../Assets/facebook 1.svg';
import instagram from '../../Assets/instagram 1.svg';
import twitter from '../../Assets/twitter 1.svg';
import snapchat from '../../Assets/snapchat 1.svg';
import tiktok from '../../Assets/tiktok 1.svg';

const Footer = () => {
  return (
    <div className='flex h-[150px] justify-between px-4  text-xs items-center sticky bg-white z-10  bottom-0 '>
      <div className='flex  justify-evenly items-center gap-10  ml-7'>
        <div>
          <a href='/'>
            <img src={logo} alt='logo' className='w-20 h-20' />
          </a>
        </div>
        <div className='flex  flex-col  justify-center items-center ml-1'>
          <h3 className='text-gray-800'>CUSTOMER CARE</h3>
          <ul className='list-none text-gray-500'>
            <li>Contact Us</li>
            <li>Payment</li>
            <li>Bonus Point</li>
            <li>Notices</li>
          </ul>
        </div>
        <div className='flex  flex-col justify-center items-center ml-2 '>
          <h3 className='text-gray-800'>COMPANY INFO</h3>
          <ul className='list-none text-gray-500 '>
            <li>About Laura’s Closet </li>
            <li>Social Responsibility</li>
            <li>Affiliate</li>
            <li>Fashion Blogger</li>
          </ul>
        </div>
      </div>
      <div className='flex justify-center flex-col items-center mr-12'>
        <h3 className='text-gray-800'>SOCIALS</h3>
        <div className='flex gap-5 text-2xl cursor-pointer'>
          <img src={facebook} alt='facebook/icons' />
          <img src={twitter} alt='twitter/icons' />
          <img src={instagram} alt='instagram/icons' />
          <img src={tiktok} alt='tiktok/icons' />
          <img src={snapchat} alt='snapchat/icons' />
        </div>
      </div>
    </div>
  );
};

export default Footer;
