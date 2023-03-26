import React, { useState } from "react";
import Form_Button from "../Form_Button";
import Form_Input from "../Form_Input";
const AISteps = (props) => {
  const { responseData } = props;

  console.log("responseData", responseData);

  function handleClickForStep(step) {
    console.log(`Clicked for step: ${step}`);
  }

  return (
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
