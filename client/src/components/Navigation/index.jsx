import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CustomLink from "../CustomLink";
import Form_Button from "../Form_Button";
import Logo from "./../../assets/bg.png";

const Navigation = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  return (
<nav class="bg-gray-800 h-16 px-6 flex items-center justify-between">
  <div class="absolute left-6 top-2">
    <img src={Logo} alt="logo" class="h-12" />
  </div>
  <div class="flex items-center justify-center flex-grow">
    <ul class="flex space-x-4">
      {user ? (
        <>
          <li>
            <CustomLink to="/dashboard">Dashboard</CustomLink>
          </li>
          <li>
            <CustomLink to="/settings">Settings</CustomLink>
          </li>
          <li>
            <CustomLink to="/all-boards">All Kanban Boards</CustomLink>
          </li>
          <li>
            <button onClick={handleLogout} class="inline-block align-baseline font-bold text-lg text-blue-500 hover:text-white">
              Log Out
            </button>
          </li>
        </>
      ) : (
        <>
          <li>
            <CustomLink to="/register">Register</CustomLink>
          </li>
          <li>
            <CustomLink to="/login">Login</CustomLink>
          </li>
        </>
      )}
    </ul>
  </div>
</nav>







  
  )
}
export default Navigation;
