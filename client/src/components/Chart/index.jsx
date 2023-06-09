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





  const handleTasks = async (id) => {


    let ticketsArray = []
    let response = await fetch(`http://localhost:5000/kanban-boards/${id}/tickets`);
    let data = await response.json()
    console.log(data)
    let filteredData = data.filter(ticket => ticket.user_assigned === user.id);



    for (let task of filteredData) {
      let deltaDate;
      if (task.ticket_status == "closed") {
        if (task.end_time != null) {
          deltaDate = changeDate(task, "end") - changeDate(task, "start")
        }
        else {
          const currentDate = new Date(Date.now()).toISOString().slice(0, 10)
          deltaDate = currentDate - changeDate(task, "start")
        }
      }



      let new_ticket = {
        id: task.id,
        text: task.ticket_content,
        start_date: changeDate(task, "start"),
        duration: deltaDate,
        status: task.ticket_status

      }


      ticketsArray.push(new_ticket)

    }
    console.log(ticketsArray)
    setBoardTasks(ticketsArray)

  }

  const changeDate = (date, check) => {
    let dateObj;

    if (check == "start") {
      dateObj = new Date(date.start_time);
    }
    if (check == "end") {
      dateObj = new Date(date.end_time);
    }

    let year = dateObj.getUTCFullYear();
    let month = ('0' + (dateObj.getUTCMonth() + 1)).slice(-2);
    let day = ('0' + dateObj.getUTCDate()).slice(-2);
    let formattedDate = `${year}-${month}-${day}`;
    return formattedDate
  }


  //
  useEffect(() => {
    gantt.templates.task_class = (start, end, task) => {
      if (task.status === "closed") {
        return "closed-task";
      }
      return "";
    };

    gantt.clearAll();
    gantt.config.date_format = "%Y-%m-%d %H:%i:%s";
    gantt.init('gantt-chart');
    gantt.parse({ data: boardTasks });
    gantt.attachEvent('onReady', () => {
      gantt.config.editable = false;
    });
  }, [boardTasks]);




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
        <div className="min-h-1/2 max-h-screen max-w-1/2 scroll-container overflow-x-auto" id="gantt-chart" style={{ width: '100%', height: '250px' }}></div>

      </div>


    </>
  )
};

export default Chart;
