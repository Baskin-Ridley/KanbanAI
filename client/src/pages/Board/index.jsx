import React from 'react'
import { useParams } from 'react-router-dom';
import { Headers } from "../../components/Board/index.jsx";


const Board = () => {
  const { id } = useParams();
  return (
    <>
        <Headers board_id={id}/>
    </>
  )
}

export default Board
