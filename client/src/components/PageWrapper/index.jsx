import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import Header from '../Header';
import Navigation from '../Navigation';
import Message from '../Message';
import Footer from '../Footer';
import { UserProvider } from '../../context/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';

const PageWrapper = () => {
  return (
    <Router>
      <UserProvider>
        <Header />
        <Navigation />
        <Message />
        <Outlet />
        <Footer />
        {user && <BoardTest />}
      </UserProvider>
    </Router>
  );
};

export default PageWrapper;
