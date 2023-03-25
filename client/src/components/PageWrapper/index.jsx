import React, { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Navigation from "../Navigation";
import Message from "../Message";
import FancyMenu from "../FancyMenu";
import Footer from "../Footer";


const PageWrapper = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <Header />
      <Navigation />
      <Message />
      <Outlet />
      {user && <FancyMenu />}
      <Footer />
    </>
  );
};

export default PageWrapper;
