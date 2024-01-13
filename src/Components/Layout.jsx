import Navbar from '../Components/Navbar/Navbar';
import React from 'react';
import Footer from './Footer/Footer';

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className='max-w-7xl max-h-[80%] m-auto'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
