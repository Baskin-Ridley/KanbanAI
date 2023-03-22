import React, { createContext, useState, useContext } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [stackView, setStackView] = useState(false);
  const [gitView, setGitView] = useState(false);

  const login = async (userData) => {
    const url = "http://localhost:5000/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const user = await response.json();
        setUser(user);
      } else {
        const error = await response.json();
        throw new Error(error.message);
      }
    } catch (error) {
      console.error("Error logging user in", error);
      throw new Error(error.message);
    }
  };

  const register = async (userData) => {
    const url = "http://localhost:5000/register";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    };
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      //setUser(data.user);
      setUser(null);
    } catch (error) {
      console.error("Error registering user", error);
      throw new Error(error.message);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, login, logout, register, stackView, setStackView, gitView, setGitView }}>
      {children}
    </UserContext.Provider>
  );
};


export const useView = () => useContext(UserContext);
