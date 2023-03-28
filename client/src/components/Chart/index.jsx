import React, { useEffect } from 'react';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.js';



const tasks = {
  data: [
    { id: 1, text: 'Task 1', start_date: '2023-03-15', duration: 7 },
    { id: 2, text: 'Task 2', start_date: '2023-03-18', duration: 7 },
    { id: 3, text: 'Task 3', start_date: '2023-03-20', duration: 8 },
    { id: 4, text: 'Task 4', start_date: '2023-03-22', duration: 7 }
  ]
};

const Chart = () => {
  useEffect(() => {
    gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
    gantt.init('gantt-chart');
    gantt.parse(tasks);
    gantt.attachEvent('onReady', () => {
      gantt.config.editable = false;
    });

  }, []);

  return (
    <>
      <div className='chartCardContainer p-4 max-w-1/2'>
        <div className="min-h-1/2 max-h-screen max-w-1/2 scroll-container overflow-x-auto " id="gantt-chart" style={{ width: '100%', height: '250px' }}></div>;
      </div>
    </>
  )
};

export default Chart;
