import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';

function AllBoards() {
  const { user } = useContext(UserContext);
  const [kanbanBoards, setKanbanBoards] = useState([]);

  //user.id = 1;

  useEffect(() => {
    fetch(`http://localhost:5000/users/${user.id}/kanban_boards`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch kanban boards');
        }
        return response.json();
      })
      .then((data) => setKanbanBoards(data))
      .catch((error) => console.error(error));
  }, [user]);

  console.log(kanbanBoards)

  const navigate = useNavigate();

  function handleDelete(id) {
    fetch(`http://localhost:5000/kanban_boards/${id}`, { method: 'DELETE' })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to delete kanban board');
        }
        return response.json();
      })
      .then(() => {
        setKanbanBoards(kanbanBoards.filter((kanbanBoard) => kanbanBoard.board_id !== board_id));
        alert('Kanban board was deleted');
      })
      .catch((error) => console.error(error));
  }

  return (
    <main>
      <h1>All Kanban Boards</h1>
      <ul>
        {kanbanBoards.map((kanbanBoard) => (
          <li key={kanbanBoard.board_id}>
            {kanbanBoard.board_id}
            <Link to={`/board/${kanbanBoard.board_id}`} key={`view-${kanbanBoard.board_id}`}>View</Link>
            <button type="button" onClick={() => handleDelete(kanbanBoard.board_id)}>
              Delete
            </button>
            <Link to={`/kanban/${kanbanBoard.board_id}/edit`} key={`edit-${kanbanBoard.board_id}`}>Edit</Link>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default AllBoards;
