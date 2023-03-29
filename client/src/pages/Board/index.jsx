import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Headers } from "../../components/Board/index.jsx";


const Board = () => {
  const { id } = useParams();
  const [boardData, setBoardData] = useState(null);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/kanban-boards/${id}`
        );
        const data = await response.json();
        setBoardData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      console.log(boardData)
    };

    fetchBoardData();
  }, [id]);
  return (
    <main className="flex flex-col items-center justify-center ml-3 mr-3">
      <div className="w-full flex justify-center">
      {boardData ? (
          <h2 className="text-3xl font-bold m-2 text-center">
            {boardData.name}
          </h2>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Headers board_id={id} />
    </main>
  )
}

export default Board
