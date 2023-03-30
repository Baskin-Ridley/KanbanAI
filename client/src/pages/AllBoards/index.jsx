import React, { useState, useEffect, useContext } from "react";
import Form_Button from "../../components/Form_Button";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import "react-toastify/dist/ReactToastify.css";

function AllBoards() {
  const { user } = useContext(UserContext);
  const [kanbanBoards, setKanbanBoards] = useState([]);

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

  const navigate = useNavigate();

  function handleDelete(id) {
    fetch(`http://localhost:5000/kanban-boards/${id}`, { method: "DELETE" })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete kanban board");
        }
      })
      .then(() => {
        setKanbanBoards(
          kanbanBoards.filter(
            (kanbanBoard) => kanbanBoard.board_id !== id
          )
        );
        // alert("Kanban board was deleted");

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
          return response.json();
          // const newBoard = response.json();
          // // console.log(newBoard)
          // setKanbanBoards([...kanbanBoards, newBoard]);
          // return response.json();
        })
        .then((newBoard) => {
          console.log(newBoard)
          setKanbanBoards([...kanbanBoards, newBoard]);
          setNewBoardName("");
          setShowInput(false);})
        // .then((data) => {
        //   // console.log(data, 'data')
        // })

        
      }
      setNewBoardName("");
      setShowInput(false);
  }
  

  return (
    <div className="w-full mx-auto text-center">
      <h2 className="text-3xl font-bold m-2 text-center">
        All Kanban Boards
      </h2>
      <main className="flex w-1/3 flex-col items-center border-box justify-center m-2 rounded-lg border border-gray-400 bg-blue-50 px-2 py-3 text-center" style={{ display: "inline-block" }}>

      <ul>
        {kanbanBoards.map((kanbanBoard) => (
          <div key={kanbanBoard.board_id} className="">
            <li
              key={kanbanBoard.board_id}
              className="flex items-center mb-4"
            >
              <div className="w-1/3 m-2 text-black-900 font-semibold text-lg p-2 ml-10 rounded">
                {kanbanBoard.name}
              </div>
              <div className="w-auto text-center m-2">
                  <Link
                    to={`/board/${kanbanBoard.board_id}`}
                    key={`view-${kanbanBoard.board_id}`}
                  ><button className="bg-blue-500 w-15 h-10 hover:color-bg-4 focus:shadow-outline rounded py-2 px-4 font-bold text-white focus:outline-none transition-colors hover:bg-blue-200 hover:text-black ">
                    View
                    </button>
                  </Link>
              </div>
              <div className="w-auto text-center m-2">
                <button
                  onClick={() => handleDelete(kanbanBoard.board_id)}
                  className="bg-orange-500 w-15 h-10 text-white border border-transparent hover:bg-orange-200 hover:text-black rounded py-2 px-4 font-bold focus:outline-none transition-colors duration-200 ml-0"
                >
                Delete
                </button>
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
              className="border bg-blue-100 rounded py-2 px-4 focus:outline-none"
              autoFocus
              
            />
            <p className="text-gray-500 text-sm italic mt-1">Press Enter once you typed the project name</p>
          </form>
        ) : (
          <button
            onClick={() => setShowInput(true)}
            className="bg-blue-500 hover:color-bg-4 focus:shadow-outline rounded py-2 px-4 font-bold text-white focus:outline-none hover:bg-blue-200 hover:text-black "
          >
            Create New Board
          </button>
        )}
      </main>
    </div>
  );
}

export default AllBoards;
