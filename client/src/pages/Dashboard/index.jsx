import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  return (
    <main className="w3-container w3-center">
      <h2>Welcome, {user ? user.username : 'Guest'}!</h2>
      <p>This is your dashboard.</p>
    </main>
  );
};

export default Dashboard;

