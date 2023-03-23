import React, { useState } from "react";

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
    <div>
      <h1>AI Steps</h1>
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />

      <button onClick={handleClick}>Click me</button>

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
