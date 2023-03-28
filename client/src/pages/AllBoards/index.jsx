import React, { useState, useEffect, useContext } from "react";
import Form_Button from "../../components/Form_Button";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function AllBoards() {
  const { user } = useContext(UserContext);
  const [kanbanBoards, setKanbanBoards] = useState([]);

  //user.id = 1;

  useEffect(() => {
    fetch(`https://built-differently-backend.onrender.com/users/${user.id}/kanban_boards`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch kanban boards");
        }
        return response.json();
      })
      .then((data) => setKanbanBoards(data))
      .catch((error) => console.error(error));
  }, [user]);

  const navigate = useNavigate();

  function handleDelete(id) {
    fetch(`https://built-differently-backend.onrender.com/kanban_boards/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete kanban board");
        }
        return response.json();
      })
      .then(() => {
        setKanbanBoards(
          kanbanBoards.filter(
            (kanbanBoard) => kanbanBoard.board_id !== board_id
          )
        );
        alert("Kanban board was deleted");
      })
      .catch((error) => console.error(error));
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-8 m-12 text-center">
        All Kanban Boards
      </h2>
      <ul>
        {kanbanBoards.map((kanbanBoard) => (
          <div key={kanbanBoard.board_id} className="w-full mx-auto">
            <li
              key={kanbanBoard.board_id}
              className="flex items-center justify-center space-x-4 mb-4"
            >
              <div>Board Id: {kanbanBoard.board_id}</div>
              <div>
                <Link
                  to={`/board/${kanbanBoard.board_id}`}
                  key={`view-${kanbanBoard.board_id}`}
                >
                  View
                </Link>
              </div>
              <div>
                <Form_Button
                  buttonText="Delete"
                  onClick={() => handleDelete(kanbanBoard.board_id)}
                  ariaLabel="Button for deleting a Kanban board"
                />
              </div>
              <div>
                <Link
                  to={`/kanban/${kanbanBoard.board_id}/edit`}
                  key={`edit-${kanbanBoard.board_id}`}
                >
                  Edit
                </Link>
              </div>
            </li>
          </div>
        ))}
      </ul>
    </main>
  );
}

export default AllBoards;
