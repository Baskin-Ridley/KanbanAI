import React, { useEffect, useState, useRef } from "react";
import Form_Button from "../../Form_Button";
import Form_Input from "../../Form_Input";
import AISteps from "../../AI";
const CreateTicketPopUp = (props) => {
  // console.log(props)
  const [tickets, setTickets] = useState({
    title: "",
    content: "",
  });
  const [responseData, setResponseData] = useState([]);
  console.log(tickets);

  function closeModal() {
    props.setIsOpenCreate(false);
    setResponseData([]);
  }

  function handleTitleUpdate(event) {
    setTickets({ ...tickets, title: event.target.value });
  }
  function handleContentUpdate(event) {
    setTickets({ ...tickets, content: event.target.value });
  }

  function handleAddItem(headerId, shouldCloseModal) {
    // console.log(headerId)
    const slicedId = headerId.id.slice(6).replace(/\D/g, "");
    // console.log(shouldCloseModal);

    fetch("http://localhost:5000/kanban-tickets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: tickets.title,
        content: tickets.content,
        user_id: 1,
        start_time: "Wed, 22 Mar 2023 17:06:24 GMT",
        header_id: slicedId,
        ticket_status: "open",
        kanban_board_id: props.board_id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Ticket created:", data);
        props.fetchData();
        if (shouldCloseModal) {
          closeModal();
        }
      })
      .catch((error) => console.error(error));
  }

  function handleAiClick() {
    const data = { task: tickets.title, steps: "currently not used" };
    console.log("Sending data:", data);

    fetch("http://localhost:5000/ai-steps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Received data:", data);
        const steps = data.steps_for_task
          .split("\n")
          .filter((step) => step.trim() !== "");
        console.log("Extracted steps:", steps);
        setResponseData(steps);
        if (shouldCloseModal) {
          closeModal();
        }
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if (event.keyCode === 27) {
        closeModal();
      }
    });

    // cleanup function to remove the event listener
    return () => {
      document.removeEventListener("keydown", function (event) {
        if (event.keyCode === 27) {
          closeModal();
        }
      });
    };
  }, []);
  return (
    <>
      {props.isOpenCreate && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl">
              <div className="p-4" id="create-ticket">
                <div className="flex flex-col	justify-between">
                  <h2 className="text-xl font-bold">Create New Task</h2>
                  <Form_Input
                    label="Title"
                    type="text"
                    name="title"
                    placeholder="Title"
                    ariaLabel="title"
                    onChange={handleTitleUpdate}
                  />
                  <Form_Button
                    buttonText="Generate steps for task"
                    onClick={handleAiClick}
                    ariaLabel="Button for generating steps for task using AI"
                  />
                  <Form_Input
                    label="Content"
                    type="text"
                    name="content"
                    placeholder="Content"
                    ariaLabel="content"
                    onChange={handleContentUpdate}
                  />
                  <AISteps
                    responseData={responseData}
                    setTickets={setTickets}
                    tickets={tickets}
                    handleAddItem={handleAddItem}
                  />

                  <Form_Button
                    buttonText="Save"
                    onClick={() => handleAddItem(props, true)}
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
