import React from 'react'
import { useParams } from 'react-router-dom';
import { Headers } from "../../components/Board/index.jsx";


const Board = () => {
  const { id } = useParams();
  return (
    <main className="flex flex-col items-start justify-start ml-3">
      <div className="w-full flex justify-center">
        <h2 className="text-3xl font-bold mb-3 m-2 text-center">
          Board id {id}
        </h2>
      </div>
      <Headers board_id={id} />
    </main>
  )
}

export default Board
