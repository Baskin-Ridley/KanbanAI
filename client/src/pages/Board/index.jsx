import React from 'react'
import { useParams } from 'react-router-dom';
import { Headers } from "../../components/Board/index.jsx";


const Board = () => {
  const { id } = useParams();
  return (
    <main>
        <Headers board_id={id}/>
    </main>
  )
}

export default Board
