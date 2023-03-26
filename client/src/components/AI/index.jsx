import React, { useState } from "react";
import Form_Button from "../Form_Button";
import Form_Input from "../Form_Input";
const AISteps = () => {
  const [task, setTask] = useState("");
  const [responseData, setResponseData] = useState([]);

  function handleClick() {
    const data = { task: task, steps: "currently not used" };
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
      })
      .catch((error) => console.error(error));
  }

  function handleClickForStep(step) {
    console.log(`Clicked for step: ${step}`);
  }

  return (
    // <main className="flex flex-col items-center justify-center">
    //   <Form_Button
    //     buttonText="Generate steps for task"
    //     onClick={handleClick}
    //     ariaLabel="Button for generating steps for task using AI"
    //   />
    <>
      {responseData && (
        <div>
          <ol>
            {responseData.map((step, index) => (
              <div className="flex flex-row gap-2 mb-2">
                <li
                  className="w-64 border rounded p-2 flex items-center bg-white"
                  key={index}
                >
                  {step}{" "}
                </li>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleClickForStep(step)}
                >
                  Add Ticket
                </button>
              </div>
            ))}
          </ol>
        </div>
      )}
    </>

    // {/* </main> */}
  );
};

export default AISteps;
