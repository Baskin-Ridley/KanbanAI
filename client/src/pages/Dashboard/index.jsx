import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import "./dashboard.css"
import { Notification } from "../../components"


const Dashboard = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <main className="flex flex-col items-center justify-center">
        <h2 className="text-3xl font-bold mb-8 m-12 text-center">Welcome, {user ? user.username : 'Guest'}!</h2>
        <p>This is your dashboard.</p>
      </main>

      {user.isSuper ? <>
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
      </> : null}

    </>

  );
};

export default Dashboard;

