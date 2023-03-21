import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthentication = async () => {
      const response = await fetch('http://localhost:5000/check-authentication', {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      if (response.status === 200) {
        setUser(data.user);
      }
    };
    checkAuthentication();
  }, []);

  const handleLogin = async (credentials) => {
    const response = await fetch('http://localhost:5000/login', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    });
    const data = await response.json();
    if (response.status === 200) {
      setUser(data.user);
      navigate('/dashboard');
    }
  };

  const handleLogout = async () => {
    const response = await fetch('http://localhost:5000/logout', {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (response.status === 200) {
      setUser('');
      navigate('/login');
    }
  };

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};
