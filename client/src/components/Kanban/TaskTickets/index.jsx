import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  rectSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import SortableItem from "../SortableItem/Index.jsx";

const TaskTickets = () => {
  const [testTickets, setTestTickets] = useState([
    {
      id: 1,
      title: "Test Ticket 1",
      description: "This is a test ticket",
    },
    {
      id: 2,
      title: "Test Ticket 2",
      description: "This is a test ticket",
    },
    {
      id: 3,
      title: "Test Ticket 3",
      description: "This is a test ticket",
    },
  ]);

  function handleDragEnd(event) {
    console.log("Drag ended");
    const { active, over } = event;

    if (active.id !== over.id) {
      setTestTickets((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
    //this is where we can update the database
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="flex flex-row space-x-4">
        <SortableContext items={testTickets} strategy={rectSortingStrategy}>
          {testTickets.map((ticket) => (
            <SortableItem key={ticket.id} id={ticket.id}>
              <div className="flex flex-col items-center justify-center w-64 h-32 rounded-md bg-white">
                <h3 className="text-black">{ticket.title}</h3>
                <p className="text-black">{ticket.description}</p>
              </div>
            </SortableItem>
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default TaskTickets;
