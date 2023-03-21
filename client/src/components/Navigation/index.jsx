import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Navigation = () => {
  const { user, handleLogout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogoutClick = async () => {
    try {
      await handleLogout();
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav>
      {!user ? (
        <>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </>
      ) : (
        <>
          <Link to="/dashboard">Dashboard</Link>
          <button onClick={handleLogoutClick}>Logout</button>
        </>
      )}
    </nav>
  );
};

export default Navigation;
