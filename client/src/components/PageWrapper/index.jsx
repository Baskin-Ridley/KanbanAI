import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { NavLink, Outlet } from 'react-router-dom';
import Header from '../Header';
import Navigation from '../Navigation';
import Message from '../Message';
import Footer from '../Footer';
import { BoardTest } from '../../pages';
import { UserProvider } from '../../context/UserContext';
import { BrowserRouter as Router } from 'react-router-dom';


const PageWrapper = () => {
  const { user, logout } = useContext(UserContext);
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
