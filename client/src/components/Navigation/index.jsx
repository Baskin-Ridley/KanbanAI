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
    // <nav className="w3-center w3-margin">
    <nav>
      {user ? (
        <>
          {/* <div className="nav-element w3-btn w3-padding"> */}
            {/* <Link to="/dashboard" className="w3-bar-item w3-button"> */}
            <Link to="/dashboard">
              Dashboard
            </Link>
          {/* </div>
          <div className="nav-element w3-btn w3-padding"> */}
            {/* <button onClick={handleLogout} className="w3-bar-item w3-button"> */}
            <button onClick={handleLogout}>
              Logout
            </button>
          {/* </div> */}
        </>
      ) : (
        <>
          <ul>
            {/* <div className="nav-element w3-btn w3-padding"> */}
              {/* <Link to="/" className="w3-bar-item w3-button"> */}
              <li><Link to="/">
                Home
              </Link></li>
              
            {/* </div>
            <div className="nav-element w3-btn w3-padding"> */}
              <li><Link to="/register">
              {/* <Link to="/register" className="w3-bar-item w3-button"> */}
                Register
              </Link></li>
              
            {/* </div>
            <div className="nav-element w3-btn w3-padding"> */}
              {/* <Link to="/login" className="w3-bar-item w3-button"> */}
              <li><Link to="/login">
                Login
              </Link></li>
              
            {/* </div> */}
          </ul>
          
        </>
      )}
    </nav >
  );
};

export default Navigation;
