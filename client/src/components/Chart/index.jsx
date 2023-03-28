import React, { useEffect } from 'react';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.css';
import 'dhtmlx-gantt/codebase/dhtmlxgantt.js';

const data = {
  data: [
    { id: 1, text: 'Task 1', start_date: '2023-03-15', duration: 7 },
    { id: 2, text: 'Task 2', start_date: '2023-03-18', duration: 7 },
    { id: 3, text: 'Task 3', start_date: '2023-03-20', duration: 8 },
    { id: 4, text: 'Task 4', start_date: '2023-03-22', duration: 7 }
  ],
  links: [
    { id: 1, source: 1, target: 3, type: '0' },
    { id: 2, source: 3, target: 4, type: '0' },
    { id: 3, source: 1, target: 2, type: '0' }
  ]
};

const Chart = () => {
  useEffect(() => {
    gantt.init('gantt-chart');
    gantt.parse(data);
  }, []);

  return <div id="gantt-chart" style={{ width: '100%', height: '600px' }}></div>;
};

export default Chart;
