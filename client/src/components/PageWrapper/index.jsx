import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Header from '../Header';
import Navigation from '../Navigation';
import Message from '../Message';
import Footer from '../Footer';

const PageWrapper = () => {
  return (
    <>
      <Header />
      <Navigation />
      <Message />
      <Outlet />
      <Footer />
    </>
  );
};

export default PageWrapper;
