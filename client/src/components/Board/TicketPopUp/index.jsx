import React, { useEffect, useState } from "react";
import Form_Button from "../../Form_Button";
import Form_Input from "../../Form_Input";
import Form_Textarea from "../../Form_Textarea";
import Form_DropDown from "../../Form_DropDown";
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
                      <Form_Input
                        type="text"
                        value={editedTicket.ticket_title}
                        onChange={handleInputChange}
                        formElementId="ticket_title"
                        ariaLabel="Field for inputting the ticket title"
                      />
                    </h2>
                    <p className="text-gray-700 mb-2">
                      <Form_Textarea
                        value={editedTicket.ticket_content}
                        onChange={handleInputChange}
                        formElementId="ticket_content"
                        ariaLabel="Textarea for inputting the ticket content"
                      />
                    </p>
                    <p className="text-gray-700 mb-2">
                      <Form_DropDown
                        label="Status:"
                        value={editedTicket.ticket_status}
                        onChange={handleInputChange}
                        formElementId="ticket_status"
                        ariaLabel="List to select the task status from"
                        listOptions={[
                          "To do",
                          "In Progress",
                          "Done",
                          "Blocked",
                        ]}
                      />
                    </p>
                    {user && (
                      <p className="text-gray-700 mb-2">
                        {/* If this text below is a label for the field, 
                        add 'label="Users Assigned:"' 
                        as a property in the Form_Input field */}
                        Users Assigned:{" "}
                        <Form_Input
                          type="text"
                          value={editedTicket.user_assigned}
                          onChange={handleInputChange}
                          formElementId="user_assigned"
                          ariaLabel="Input field for assigned user"
                        />
                      </p>
                    )}
                    <Form_Button
                      buttonText="Save"
                      ariaLabel="Button for saving the ticket changes"
                    />
                  </form>
                ) : (
                  <p>No matching ticket found</p>
                )}
                <Form_Button
                  buttonText="Close"
                  onClick={closeModal}
                  ariaLabel="Button for closing modal popup view"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default TicketPopUp;
