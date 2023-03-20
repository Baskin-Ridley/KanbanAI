import React, { useState } from "react";
import { DndContext, useDraggable } from "@dnd-kit/core";

const TaskHeader = () => {
  const [testHeaders, setTestHeaders] = useState([
    {
      id: 1,
      title: "To Do",
      color: "bg-red-500",
    },
    {
      id: 2,
      title: "In Progress",
      color: "bg-blue-500",
    },
    {
      id: 3,
      title: "Done",
      color: "bg-green-500",
    },
  ]);

  return (
    <div className="flex space-x-4">
      {testHeaders.map((header) => (
        <div
          key={header.id}
          className={`p-4 rounded-md ${header.color} text-white font-medium`}
        >
          {header.title}
        </div>
      ))}
    </div>
  );
};

export default TaskHeader;
