import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import CustomLink from "../CustomLink";
import Button from "../Button";

const Navigation = () => {
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = (e) => {
    e.preventDefault();
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800">
      <ul className="flex items-center justify-between max-w-6xl mx-auto px-4 py-2">
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
              <Button
                className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                onClick={handleLogout}
              >
                Logout
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <CustomLink to="/">Home</CustomLink>
            </li>
            <li>
              <CustomLink to="/register">Register</CustomLink>
            </li>
            <li>
              <CustomLink to="/login">Login</CustomLink>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;
