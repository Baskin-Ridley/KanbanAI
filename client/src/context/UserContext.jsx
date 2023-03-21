import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
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
        navigate('/dashboard');
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
      setUser(null);
      navigate('/login');
    }
  };

  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};




// import { createContext, useState, useEffect } from 'react';

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       try {
//         // check for token in local storage
//         const token = localStorage.getItem('token');
//         if (token) {
//           // decode token to get username
//           const decodedToken = JSON.parse(atob(token.split('.')[1]));
//           const username = decodedToken.username;
          
//           // make a request to check if token is valid
//           const response = await fetch('http://localhost:5000/check-authentication', {
//             headers: {
//               Authorization: `Bearer ${token}`,
//               username: username,
//             },
//             credentials: 'include',
//           });
//           if (response.ok) {
//             const data = await response.json();
//             console.log(data.user.username);
//             setUser(data.user);
//           } else {
//             // remove invalid token from local storage
//             localStorage.removeItem('token');
//           }
//         }
//       } catch (error) {
//         console.error('Error checking authentication:', error);
//       }
//     };

//     checkAuthentication();
//   }, []);

//   return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
// };
