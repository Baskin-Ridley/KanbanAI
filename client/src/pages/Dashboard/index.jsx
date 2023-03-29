import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import "./dashboard.css"
import { Notification, UserWindow, LinkGenerator, Chart } from "../../components"
import { Gantt } from 'dhtmlx-gantt/codebase/dhtmlxgantt';



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
          <div className='row flex justify-between'>
            <div className='col-4 w-1/2 p-4'>
              <div className='left-container'>
                <h3>Notifications:</h3>
                <div className='Card'>
                  {user && <Notification />}
                </div>
                <div className='Card'>
                  {user && <UserWindow />}
                </div>
                <div className='Card'>
                  {user && <LinkGenerator />}
                </div>
              </div>
            </div>
            <div className='col-8 w-1/2 p-4'>
              <div className='right-container'>
                <h3>Gantt Chart:</h3>
                {user.isSuper && <Chart />}
              </div>
            </div>
          </div>
        </div>
      </> : null}

    </>

  );
};

export default Dashboard;

