import { createContext, useState, useEffect } from 'react';
//const fetch = global.fetch || require('node-fetch'); 
import React from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      // if (!global.fetch) {
      //   const nodeFetchModule = await import('node-fetch');
      //   global.fetch = nodeFetchModule.default;
      // }
      try {
        const response = await fetch('http://localhost:3000/api/auth/check-auth', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error checking authentication:', error);
      }
    };

    // checkAuth();
  }, []);

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};
