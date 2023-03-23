import React, { useEffect, useState } from "react";

function TicketList(props) {
  const [tickets, setTickets] = useState([]);
  console.log(props.ticketContent);
  useEffect(() => {
    fetch("http://localhost:5000/kanban-tickets")
      .then((response) => response.json())
      .then((data) => setTickets(data))
      .catch((error) => console.error(error));
  }, []);

  const matchingTicket = tickets.find(
    (ticket) => ticket.ticket_content === props.ticketContent
  );

  const closeModal = () => {
    props.setIsOpen(false);
  };

  return (
    <>
      {props.isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl">
              <div className="p-4">
                {matchingTicket ? (
                  <>
                    <h2 className="text-lg font-bold mb-2">
                      {matchingTicket.ticket_title}
                    </h2>
                    <p className="text-gray-700 mb-2">
                      {matchingTicket.ticket_content}
                    </p>
                    <p className="text-gray-700 mb-2">
                      Status: {matchingTicket.ticket_status}
                    </p>
                    <p className="text-gray-700 mb-2">
                      Users Assigned: {matchingTicket.user_assigned}
                    </p>
                  </>
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

export default TicketList;
