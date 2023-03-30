import React, { useState, useEffect } from "react";
import Form_Button from "../Form_Button";
import Form_Input from "../Form_Input";
const AISteps = ({
  responseData,
  setTickets,
  tickets,
  handleAddItem,
  headerId,
}) => {
  const [renderedSteps, setRenderedSteps] = useState([]);

  useEffect(() => {
    const delay = 250; // Set the delay time in milliseconds
    const steps = responseData.map((step, index) => {
      const timeoutId = setTimeout(() => {
        setRenderedSteps((prevSteps) => [...prevSteps, step]);
      }, index * delay);

      return { step, timeoutId };
    });
    return () => {
      steps.forEach(({ timeoutId }) => clearTimeout(timeoutId));
    };
  }, [responseData]);
  function handleClickForStep(step, headerId) {
    let newHeaderId = {
      id: headerId,
    };
    let cleanString = step.replace(/^[0-9]+\)\s+/, "");
    setTickets({ ...tickets, title: cleanString, content: cleanString });
    handleAddItem(newHeaderId, false);
  }

  return (
    <>
      {responseData && (
        <div>
          <ol>
            {renderedSteps.map((step, index) => (
              <div className="flex flex-row gap-2 mb-2">
                <li
                  className="w-64 border rounded p-2 flex items-center bg-white"
                  key={index}
                >
                  {step}{" "}
                </li>
                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  onClick={() => handleClickForStep(step, headerId)}
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
