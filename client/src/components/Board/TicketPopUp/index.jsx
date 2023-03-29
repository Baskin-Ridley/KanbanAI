import React, { useEffect, useState, useCallback } from "react";
import Form_Button from "../../Form_Button";
import Form_Input from "../../Form_Input";
import Form_Textarea from "../../Form_Textarea";
import Form_DropDown from "../../Form_DropDown";
import AssignUserContainer from "../../AssignUsers/AssignUserContainer.jsx";
function TicketPopUp(props) {
  const [tickets, setTickets] = useState([]);
  const [user, setUser] = useState(null);
  const [matchingTicket, setMatchingTicket] = useState(null);
  const [editedTicket, setEditedTicket] = useState(null);
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);

  // Test functionality
  const [technologies, setTechnologies] = useState('Python');
  const [testFramework, setTestFramework] = useState('pytest');
  const [functionToTest, setFunctionToTest] = useState('function add(a, b) {\n  return a + b;\n}');
  const [testsForFunction, setTestsForFunction] = useState('Your tests will appear here');

    // Test functionality
  const sanitizeInput = (input) => {
    // Remove any leading/trailing white space
    let sanitizedInput = input.trim();
    // Replace any tabs with two spaces
    sanitizedInput = sanitizedInput.replace(/\t/g, '  ');
    // Replace any consecutive spaces with two spaces
    sanitizedInput = sanitizedInput.replace(/ +/g, ' ');
    // Replace any line breaks with a '\n' character
    sanitizedInput = sanitizedInput.replace(/(\r\n|\n|\r)/gm, '\n');
    return sanitizedInput;
  };

    // Test functionality
  const handleGenerateTests = async (event) => {
    event.preventDefault();
    const sanitizedTechnologies = sanitizeInput(technologies);
    const sanitizedTestFramework = sanitizeInput(testFramework);
    const sanitizedFunctionToTest = sanitizeInput(functionToTest);
    const sanitisedGeneratedTest = sanitizeInput(editedTicket.test_generated_test);
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        technologies: sanitizedTechnologies,
        test_framework: sanitizedTestFramework,
        function_to_test: sanitizedFunctionToTest,
        test_generated_test: sanitisedGeneratedTest
      }),
    };
    const response = await fetch('http://localhost:5000/ai-test', requestOptions);
    const data = await response.json();
    setTestsForFunction(data.tests_for_function);
  };

  function openGenerate() {
    setIsGenerateOpen(!isGenerateOpen);
    clg("openGenerate");
  }

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

  useEffect(() => {
    document.addEventListener("keydown", function (event) {
      if (event.keyCode === 27) {
        closeModal();
      }
    });

    // cleanup function to remove the event listener
    return () => {
      document.removeEventListener("keydown", function (event) {
        if (event.code === "KeyG") {
          closeModal();
        }
      });
    };
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedTicket({
      ...editedTicket,
      [name]: value,
    });
  };

  // // Test functionality
  // const sanitiseInput = (input) => {
  //   let sanitizedInput = input.trim();
  //   sanitizedInput = sanitizedInput.replace(/\t/g, "  ");
  //   sanitizedInput = sanitizedInput.replace(/ +/g, " ");
  //   sanitizedInput = sanitizedInput.replace(/(\r\n|\n|\r)/gm, "\n");
  //   return sanitizedInput;
  // };

  const handleSubmit = async (event) => {
    console.log(matchingTicket);
    event.preventDefault();
    // Test functionality
    const sanitisedTechnologies = sanitizeInput(editedTicket.test_technologies);
    const sanitisedTestFramework = sanitizeInput(editedTicket.test_testing_framework);
    const sanitisedFunctionToTest = sanitizeInput(editedTicket.test_function);
    const sanitisedGeneratedTest = sanitizeInput(editedTicket.test_generated_test);
    // const requestOptions = {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({
    //     technologies: sanitisedTechnologies,
    //     test_framework: sanitisedTestFramework,
    //     function_to_test: sanitisedFunctionToTest,
    //   }),
    // };
    // const response = await fetch(
    //   "http://localhost:5000/ai-test",
    //   requestOptions
    // );
    // const data = await response.json();
    // const newlyGeneatedTest = data.tests_for_function;
    // Add await before fetch
    await fetch(
      `http://localhost:5000/kanban-tickets/${matchingTicket.ticket_id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: editedTicket.ticket_title,
          content: editedTicket.ticket_content,
          ticket_status: editedTicket.ticket_status,
          // Test functionality
          test_technologies: sanitisedTechnologies,
          test_testing_framework: sanitisedTestFramework,
          test_function: sanitisedFunctionToTest,
          test_generated_test: sanitisedGeneratedTest,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setEditedTicket(data);
        console.log("Ticket updated:", data);
        closeModal();
        props.fetchData();
      })
      .catch((error) => console.error(error));
  };

  console.log(props.headers)

  function deleteTicket() {
    console.log(matchingTicket);
    fetch(`http://localhost:5000/kanban-tickets/${matchingTicket.ticket_id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        props.setHeaders((prevHeaders) => {
          const newHeaders = prevHeaders.map((header) => {
            const newItems = header.items.filter((item) => item.id !== `item-${matchingTicket.ticket_id}`);
            console.log(newItems)
            return {
              ...header,
              items: newItems,
            };
          });
          props.updatePositions(newHeaders);
          return newHeaders;
        });
        console.log("Ticket deleted:", data);
        closeModal();
      })
      .catch((error) => {
        console.error("Error deleting ticket: ", error);
      });
  }

  return (
    <>
      {props.isOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl">
              <div className="p-4">
                {editedTicket ? (
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-lg font-bold mb-2 flex flex-row justify-between">
                      <div className="w-3/4">
                        <Form_Input
                          type="text"
                          value={editedTicket.ticket_title}
                          onChange={handleInputChange}
                          formElementId="ticket_title"
                          ariaLabel="Field for inputting the ticket title"
                        />
                      </div>
                      <Form_Button
                        type="submit"
                        buttonText="Delete"
                        onClick={deleteTicket}
                      />
                    </h2>
                    <div className="flex flex-row gap-2">
                      <p className="text-gray-700 mb-2">
                        <Form_Textarea
                          value={editedTicket.ticket_content}
                          onChange={handleInputChange}
                          formElementId="ticket_content"
                          ariaLabel="Textarea for inputting the ticket content"
                          label="Content:"
                        />
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
                      </p>
                    </div>
                    <div className="flex flex-row justify-center">
                      {matchingTicket && (
                        <AssignUserContainer
                          ticketId={matchingTicket.ticket_id}
                        />
                      )}
                    </div>

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
                      buttonText="Open AI Testing"
                      ariaLabel="Button for saving the ticket changes"
                      onClick={openGenerate}
                    />
                    <div className={` ${isGenerateOpen ? "block" : "hidden"}`}>
                      <div className={`flex flex-row p-2 gap-2`}>
                        <p>
                          <Form_Input
                            label="Technologies:"
                            type="text"
                            value={editedTicket.test_technologies}
                            onChange={handleInputChange}
                            formElementId="test_technologies"
                            ariaLabel="Field for input of technologies"
                          />
                        </p>
                        <p>
                          <Form_Input
                            label="Test Framework:"
                            type="text"
                            value={editedTicket.test_framework}
                            onChange={handleInputChange}
                            formElementId="test_testing_framework"
                            ariaLabel="Field for input of test framework"
                          />
                        </p>
                      </div>
                      <div className="flex flex-row p-2 gap-2">
                        <p>
                          <Form_Textarea
                            label="Function to Test:"
                            value={editedTicket.test_function}
                            // value={functionToTest}
                            // onChange={(e) => setFunctionToTest(e.target.value)}
                            onChange={handleInputChange}
                            formElementId="test_function"
                            ariaLabel="Textarea in which to write the function to test"
                          />
                        </p>
                        <p>
                          <Form_Textarea
                            label="Tests for Function:"
                            value={editedTicket.test_generated_test}
                            // value={testsForFunction}
                            // onChange={(e) => setTestsForFunction(e.target.value)}
                            onChange={handleInputChange}
                            formElementId="test_generated_test"
                            ariaLabel="Textarea in which generated tests are displayed"
                          />
                        </p>
                      </div>
                      <Form_Button
                        buttonText="Generate Tests"
                        onChange={handleGenerateTests}
                        ariaLabel="Button for generating tests"
                      />
                    </div>
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
