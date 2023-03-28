import React, { useEffect, useState } from 'react';
import { useView } from '../../context/UserContext';
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

  const [ganttBoard, setGanttBoard] = useState()
  const [ganttData, setGanttData] = useState([])
  const [boardTasks, setBoardTasks] = useState([])
  const { user } = useView()

  useEffect(() => {

    const fetchFromKanban = async () => {
      const response = await fetch(`http://localhost:5000/users/${user.id}/kanban_boards`);
      const data = await response.json()
      console.log(data)

      setGanttBoard(data)
      console.log(ganttBoard)
    }

    fetchFromKanban()
  }, [user.id])

  // data should be ticket.id:,  ticket.content:, ticket.start_time:, duration( if ticket.status == closed ticket.start_time compare ticket.end_time) (else ticket.start_time compare Date.now())



  useEffect(() => {
    gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
    gantt.init('gantt-chart');
    gantt.parse(tasks);
    gantt.attachEvent('onReady', () => {
      gantt.config.editable = false;
    });

  }, []);


  const handleTasks = async (id) => {

    const response = await fetch(`http://localhost:5000/users/${user.id}/kanban_boards`);
    const data = await response.json()
    console.log(data)

  }



  return (
    <>
      <div className='chartCardContainer p-4 max-w-1/2'>
        <div className='w-full mx-auto justify-center text-center'>
          <div className='wrapper-kanban-board text-black-900 font-semibold text-lg p-2 rounded'>
            <h3>Select the board:</h3>
            <ul className="flex flex-col items-center justify-center text-center">
              {ganttBoard && ganttBoard.map((e, i) => <> <button onClick={() => { handleTasks(e.board_id) }}> <li key={i} className="flex items-center justify-between space-x-4 mb-4">{e.name}</li></button></>)}
            </ul>
          </div>
        </div>
        <div className="min-h-1/2 max-h-screen max-w-1/2 scroll-container overflow-x-auto" id="gantt-chart" style={{ width: '100%', height: '250px' }}></div>;
      </div>


    </>
  )
};

export default Chart;