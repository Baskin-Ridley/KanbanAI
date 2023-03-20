import React, { useState } from "react";

const TaskTickets = () => {
  const [testTickets, setTestTickets] = useState([
    {
      id: 1,
      title: "Test Ticket 1",
      description: "This is a test ticket",
    },
    {
      id: 2,
      title: "Test Ticket 2",
      description: "This is a test ticket",
    },
    {
      id: 3,
      title: "Test Ticket 3",
      description: "This is a test ticket",
    },
  ]);
  return (
    <div>
      {testTickets.map((ticket) => (
        <div key={ticket.id}>
          <h3>{ticket.title}</h3>
          <p>{ticket.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TaskTickets;
