import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import "./dashboard.css"
import { Notification } from "../../components"


const Dashboard = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <main className="w3-container w3-center">
        <h2>Welcome, {user ? user.username : 'Guest'}!</h2>
        <p>This is your dashboard.</p>
      </main>

      <div className='wrapper'>
        <div className='row'>
          <div className='col-4'>
            <div className='left-container'>
              <div className='Card'>
                {user && <Notification />}
              </div>

            </div>
          </div>
          <div className='col-8'>
            <div className='right-container'>
              <p>peppe</p>
            </div>
          </div>
        </div>
      </div>

    </>
  );
};

export default Dashboard;
