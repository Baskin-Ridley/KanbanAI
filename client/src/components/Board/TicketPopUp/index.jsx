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

  return (
    <div>
      {matchingTicket ? (
        <div>
          <h2>{matchingTicket.ticket_title}</h2>
          <p>{matchingTicket.ticket_content}</p>
          <p>Status: {matchingTicket.ticket_status}</p>
          <p>Users Assigned: {matchingTicket.user_assigned}</p>
        </div>
      ) : (
        <p>No matching ticket found</p>
      )}
    </div>
  );
}

export default TicketList;
