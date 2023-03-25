import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { NavLink, Outlet } from "react-router-dom";
import Header from "../Header";
import Navigation from "../Navigation";
import Message from "../Message";
import Footer from "../Footer";
import { FancyMenu } from "../../pages";

const PageWrapper = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Header />
      <Navigation />
      <Message />
      <Outlet />
      <Footer />
      {user && <FancyMenu />}
    </>
  );
};

export default PageWrapper;
