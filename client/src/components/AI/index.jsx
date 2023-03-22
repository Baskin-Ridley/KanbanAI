import React, { useState } from "react";
import axios from "axios";
const AISteps = () => {
  function handleClick() {
    console.log("clicked");
    const data = {
      task: "create a message board",
      steps: "Steps for the task",
    };

    fetch("127.0.0.1:5000/ai-steps/", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }

  return (
    <div>
      <button onClick={handleClick}>Click me</button>
    </div>
  );
};

export default AISteps;
