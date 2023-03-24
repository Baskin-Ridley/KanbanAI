import React, { useEffect, useState } from "react";
import { Input, Button } from "../../";
const CreateTicketPopUp = (props) => {
  const closeModal = () => {
    props.setIsOpenCreate(false);
  };

  const createNewTask = async (headerId) => {
    const headerIndex = headers.findIndex((header) => header.id === headerId);
    const itemName = newItemNames[headerIndex];
    if (itemName) {
      const newSubItemId = `item-${itemName.trim()}`;
      const newSubItem = { id: newSubItemId, content: itemName };
      console.log(headerIndex);
      console.log(newSubItem, "item added");
      setHeaders((prevState) =>
        prevState.map((header) =>
          header.id === headerId
            ? { ...header, items: [...header.items, newSubItem] }
            : header
        )
      );
      setNewItemNames((prevState) =>
        prevState.map((name, index) => (index === headerIndex ? "" : name))
      );
    }
    console.log(newItemNames, "inputs check");
    console.log(headers, "headers");
    try {
      const response = await fetch(`http://localhost:5000/kanban-tickets`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: itemName,
          content: itemName,
          user_id: 1,
          start_time: "Wed, 22 Mar 2023 17:06:24 GMT",
          header_id: 3,
          ticket_status: "open",
          kanban_board_id: 1,
        }),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding new item:", error);
    }
  };

  return (
    <>
      {props.isOpenCreate && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen">
            <div className="bg-white rounded-lg overflow-hidden shadow-xl">
              <div className="p-4">
                <div className="flex justify-between">
                  <h2 className="text-xl font-bold">Create New Task</h2>
                  <Button
                    className="text-gray-400 hover:text-gray-500"
                    onClick={closeModal}
                  />
                  <h3>{props.id}</h3>
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
