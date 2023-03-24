import React, { useState } from "react";
import { Input, Button } from "..";
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
    <div className="form-container">
      <h1>AI Steps</h1>
      <Input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <Button onClick={handleClick}>Click me</Button>

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
    </div>
  );
};

export default AISteps;
