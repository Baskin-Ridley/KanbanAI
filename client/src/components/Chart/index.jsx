import React from 'react';
import Gantt from 'frappe-gantt-react';

const data = [
  {
    id: 'group1',
    name: 'Group 1',
    tasks: [
      {
        id: 'task1',
        name: 'Task 1',
        start: '2023-03-15',
        end: '2023-03-22',
        progress: 100,
        dependencies: ''
      },
      {
        id: 'task3',
        name: 'Task 3',
        start: '2023-03-20',
        end: '2023-03-28',
        progress: 50,
        dependencies: 'task1'
      }
    ]
  },
  {
    id: 'group2',
    name: 'Group 2',
    tasks: [
      {
        id: 'task2',
        name: 'Task 2',
        start: '2023-03-18',
        end: '2023-03-25',
        progress: 75,
        dependencies: ''
      }
    ]
  },
  {
    id: 'group3',
    name: 'Group 3',
    tasks: [
      {
        id: 'task4',
        name: 'Task 4',
        start: '2023-03-22',
        end: '2023-03-29',
        progress: 25,
        dependencies: ''
      }
    ]
  }
];

const Chart = () => {
  return (
    <div>
      <h1>Gantt Chart with React.js</h1>
      <Gantt tasks={data} viewMode={'Week'} />
    </div>
  );
};

export default Chart;
