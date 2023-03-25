import React from 'react'
import { useParams } from 'react-router-dom';
import { Headers } from "../../components/Board/index.jsx";


const Board = () => {
  const { id } = useParams();
  return (
    <main className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-8 m-12 text-center">Board id {id}</h2>
      <Headers board_id={id} />
    </main>
  )
}

export default Board
