import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

const Navigation = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    setUser(null);
    navigate('/');
    // try {
    //   const response = await fetch('http://localhost:3001/logout', {
    //     method: 'POST',
    //     credentials: 'include',
    //   });

    //   if (response.ok) {
    //     setUser(null);
    //     navigate('/');
    //   }
    // } catch (error) {
    //   console.error('Error logging out:', error);
    // }
  };

  return (
    <nav className="w3-center w3-margin">
      {user ? (
        <>
          <div className="nav-element w3-btn w3-padding">
            <Link to="/dashboard" className="w3-bar-item w3-button">
              Dashboard
            </Link>
          </div>
          <div className="nav-element w3-btn w3-padding">
            <button onClick={handleLogout} className="w3-bar-item w3-button">
              Logout
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="nav-element w3-btn w3-padding">
            <Link to="/" className="w3-bar-item w3-button">
              Home
            </Link>
          </div>
          <div className="nav-element w3-btn w3-padding">
            <Link to="/register" className="w3-bar-item w3-button">
              Register
            </Link>
          </div>
          <div className="nav-element w3-btn w3-padding">
            <Link to="/login" className="w3-bar-item w3-button">
              Login
            </Link>
          </div>
        </>
      )}
    </nav >
  );
};

export default Navigation;
