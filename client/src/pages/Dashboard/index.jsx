import React, { useState, useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import "./dashboard.css"
import { Notification, UserWindow, LinkGenerator, AdminChart } from "../../components"
import { Gantt } from 'dhtmlx-gantt/codebase/dhtmlxgantt';



const Dashboard = () => {
  const { user } = useContext(UserContext);
  return (
    <>

      {user.isSuper ? <>
        <div className='wrapper'>
          <div className='row flex justify-between'>
            <div className='col-4 w-1/2 p-4'>
              <div className='left-container'>
                <h3>Notifications:</h3>
                <div className='Card w-full'>
                  {user && <Notification />}
                </div>
                <div className='Card w-full'>
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
                {user.isSuper && <AdminChart />}
              </div>
            </div>
          </div>
        </div>
      </>
        : null}
    </>
  );
};

export default Dashboard;
