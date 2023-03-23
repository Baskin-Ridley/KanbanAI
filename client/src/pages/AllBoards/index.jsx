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
        setKanbanBoards(kanbanBoards.filter((kanbanBoard) => kanbanBoard.id !== id));
        alert('Kanban board was deleted');
      })
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <h1>All Kanban Boards</h1>
      <ul>
        {kanbanBoards.map((kanbanBoard) => (
          <li key={kanbanBoard.id}>
            {kanbanBoard.title}
            <Link to={`/kanban/${kanbanBoard.id}`}>View</Link>
            <button type="button" onClick={() => handleDelete(kanbanBoard.id)}>
              Delete
            </button>
            <Link to={`/kanban/${kanbanBoard.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AllBoards;
