import React, { useState, useEffect, useContext } from "react";
import Form_Button from "../../components/Form_Button";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

function AllBoards() {
  const { user } = useContext(UserContext);
  const [kanbanBoards, setKanbanBoards] = useState([]);


  //user.id = 1;

  useEffect(() => {
    fetch(`http://localhost:5000/users/${user.id}/kanban_boards`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch kanban boards");
        }
        return response.json();
      })
      .then((data) => setKanbanBoards(data))
      .catch((error) => console.error(error));
  }, [user]);

  useEffect(() => {
    fetch(`http://localhost:5000/users/${user.id}/kanban_boards`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch kanban boards");
        }
        return response.json();
      })
      .then((data) => setKanbanBoards(data))
      .catch((error) => console.error(error));
  }, [user, kanbanBoards]);

  const navigate = useNavigate();

  function handleDelete(id) {
    fetch(`http://localhost:5000/kanban-boards/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete kanban board");
        }
        return response.json();
      })
      .then(() => {
        setKanbanBoards(
          kanbanBoards.filter(
            (kanbanBoard) => kanbanBoard.board_id !== id
          )
        );
        alert("Kanban board was deleted");
      })
      .catch((error) => console.error(error));
  }

  const [showInput, setShowInput] = useState(false);
  const [newBoardName, setNewBoardName] = useState("");

  function handleInputChange(e) {
    setNewBoardName(e.target.value);
  }

  const handleCreateNewBoard = (e) => {
    e.preventDefault();
  
    if (newBoardName) {
      fetch("http://localhost:5000/kanban-boards/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: user.id,
            name: newBoardName,
          })
        })
        .then((response) => {
          // console.log(response)
          if (!response.ok) {
            throw new Error("Failed to create a new board");
          }
          const newBoard = response.json();
          // console.log(newBoard)
          setKanbanBoards([...kanbanBoards, newBoard]);
          // return response.json();
        })
        .then((data) => {
          // console.log(data, 'data')
        })

        
      }
      setNewBoardName("");
      setShowInput(false);
  }
  

  return (
    <div className="w-full mx-auto text-center">
      <main className="flex flex-col items-center border-box justify-center m-2 rounded-lg border border-gray-400 bg-blue-50 px-2 py-3 text-center" style={{ display: "inline-block" }}>

      <h2 className="text-3xl font-bold m-2 text-center">
        All Kanban Boards
      </h2>
      <ul>
        {kanbanBoards.map((kanbanBoard) => (
          <div key={kanbanBoard.board_id} className=" mx-auto">
            <li
              key={kanbanBoard.board_id}
              className="flex items-center justify-between space-x-4 mb-4"
            >
              <div className="w-1/3 text-black-900 font-semibold text-lg p-2 rounded">
                {kanbanBoard.name}
              </div>
              <div className="w-1/3 text-center">
                <Link
                  to={`/board/${kanbanBoard.board_id}`}
                  key={`view-${kanbanBoard.board_id}`}
                  className="bg-green-500 text-white border border-transparent hover:border-2 hover:border-green-500 hover:bg-white hover:text-green-500 rounded py-2 px-4 font-bold focus:outline-none transition-colors duration-200"
                >
                  View
                </Link>
              </div>
              <div>
                <Link
                  to={`/kanban/${kanbanBoard.board_id}/edit`}
                  key={`edit-${kanbanBoard.board_id}`}
                  className="bg-blue-500 text-white border border-transparent hover:border-2 hover:border-blue-500 hover:bg-white hover:text-blue-500 rounded py-2 px-4 font-bold focus:outline-none transition-colors duration-200"
                  >
                  Edit
                </Link>
              </div>
              <div className="w-1/3 flex justify-around">
                <Form_Button
                  buttonText="Delete"
                  onClick={() => handleDelete(kanbanBoard.board_id)}
                  ariaLabel="Button for deleting a Kanban board"
                  additionalClasses="bg-red-500 hover:bg-red-700"
                />
              </div>
            </li>
          </div>
        ))}
      </ul>
      {showInput ? (
          <form onSubmit={handleCreateNewBoard} className="mt-4">
            <input
              type="text"
              value={newBoardName}
              onChange={handleInputChange}
              placeholder="Enter board name and hit Enter"
              className="border bg-blue-100 rounded py-2 px-4 focus:outline-none focus:border-blue-500"
              autoFocus
            />
          </form>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="bg-blue-500 text-white py-2 px-4 rounded font-bold focus:outline-none mt-4"
          >
            Create New Board
          </button>
        )}
      </main>
    </div>
  );
}

export default AllBoards;
