import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  return (
    <main className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-8 m-12 text-center">Welcome, {user ? user.username : 'Guest'}!</h2>
      <p>This is your dashboard.</p>
    </main>
  );
};

export default Dashboard;

