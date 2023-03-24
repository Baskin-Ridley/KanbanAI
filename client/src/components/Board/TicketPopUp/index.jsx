import React, { useEffect, useState } from "react";

function TicketPopUp(props) {
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState(null);
  const [matchingTicket, setMatchingTicket] = useState(null);
  const [editedTicket, setEditedTicket] = useState(null);
  console.log(props.ticketContent);

  useEffect(() => {
    fetch("http://localhost:5000/kanban-tickets")
      .then((response) => response.json())
      .then((data) => {
        setTickets(data);
        let foundTicket = data.find(
          (ticket) => ticket.ticket_content === props.ticketContent
        );
        setMatchingTicket(foundTicket);
        setEditedTicket(foundTicket);
      })
      .catch((error) => console.error(error));
  }, [props.ticketContent]);

  const closeModal = () => {
    props.setIsOpen(false);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTicket({
      ...editedTicket,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    console.log(matchingTicket);
    event.preventDefault();
    fetch(`http://localhost:5000/kanban-tickets/${matchingTicket.ticket_id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: editedTicket.ticket_title,
        content: editedTicket.ticket_content,
        ticket_status: editedTicket.ticket_status,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // setMatchingTicket(data);
        setEditedTicket(data);
        console.log("Ticket updated:", data);
        closeModal();
        props.fetchData();
      })
      .catch((error) => console.error(error));
  };

  return (
    <>
      {props.isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl">
              <div className="p-4">
                {editedTicket ? (
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-lg font-bold mb-2">
                      <input
                        type="text"
                        name="ticket_title"
                        value={editedTicket.ticket_title}
                        onChange={handleInputChange}
                      />
                    </h2>
                    <p className="text-gray-700 mb-2">
                      <textarea
                        name="ticket_content"
                        value={editedTicket.ticket_content}
                        onChange={handleInputChange}
                      />
                    </p>
                    <p className="text-gray-700 mb-2">
                      Status:
                      <select
                        name="ticket_status"
                        value={editedTicket.ticket_status}
                        onChange={handleInputChange}
                      >
                        <option value="To Do">To Do</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Done">Done</option>
                        <option value="Blocked">Blocked</option>
                      </select>
                    </p>
                    {user && (
                      <p className="text-gray-700 mb-2">
                        Users Assigned:{" "}
                        <input
                          type="text"
                          name="user_assigned"
                          value={editedTicket.user_assigned}
                          onChange={handleInputChange}
                        />
                      </p>
                    )}

                    <button
                      className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                      type="submit"
                    >
                      Save
                    </button>
                  </form>
                ) : (
                  <p>No matching ticket found</p>
                )}

                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TicketPopUp;
