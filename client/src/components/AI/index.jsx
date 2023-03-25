import React, { useState } from "react";
import Form_Button from "../Form_Button";
import Form_Input from "../Form_Input";
const AISteps = () => {
  const [task, setTask] = useState("");
  const [responseData, setResponseData] = useState("");

  function handleClick() {
    const data = { task: task, steps: "currently not used" };

    fetch("http://localhost:5000/ai-steps", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => setResponseData(data.steps_for_task))
      .catch((error) => console.error(error));
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <h2 className="text-3xl font-bold mb-8 m-12 text-center">AI Steps</h2>
      <Form_Input label="Insert your task:" type="text" value={task} onChange={(e) => setTask(e.target.value)} ariaLabel="Field for inputting the task to be outlined into steps by AI" />
      <Form_Button buttonText="Generate steps for task" onClick={handleClick} ariaLabel="Button for generating steps for task using AI" />

      {responseData && (
        <div>
          <h2>Response data:</h2>
          <ol>
            {responseData.split("\n").map((step) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </div>
      )}
    </main>
  );
};

export default AISteps;
