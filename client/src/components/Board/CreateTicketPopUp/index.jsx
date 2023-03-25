import React, { useEffect, useState } from "react";
import Form_Button from "../../Form_Button";
import Form_Input from "../../Form_Input";
const CreateTicketPopUp = (props) => {
  const [tickets, setTickets] = useState([]);

  const closeModal = () => {
    props.setIsOpenCreate(false);
  };

  function handleAddItem() {
    fetch("http://localhost:5000/kanban-tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: "New Ticket",
        content: "New Ticket Content",
        ticket_status: "New",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Ticket created:", data);
      })
      .catch((error) => console.error(error));

    props.fetchData();
    closeModal();
  }

  return (
    <>
      {props.isOpenCreate && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl">
              <div className="p-4">
                <div className="flex flex-col	justify-between">
                  <h2 className="text-xl font-bold">Create New Task</h2>
                  <h3>{props.id}</h3>
                  <Form_Button
                    buttonText="Save"
                    onClick={() => handleAddItem(props.id)}
                    ariaLabel="Button for saving the data"
                  />
                  <Form_Button
                    buttonText="Close"
                    onClick={closeModal}
                    ariaLabel="Button for closing the modal popup view"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateTicketPopUp;
