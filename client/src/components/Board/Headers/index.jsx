import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './style.css'


const initialHeaders = [
    {
      id: "header-0",
      name: "Header 1",
      items: [
        { id: "0-item-0", content: "Item 1" },
        { id: "0-item-1", content: "Item 2" },
      ],
    },
    {
      id: "header-1",
      name: "Header 2",
      items: [
        { id: "1-item-0", content: "Item 3" },
        { id: "1-item-1", content: "Item 4" },
      ],
    },
    {
      id: "header-2",
      name: "Header 3",
      items: [
        { id: "2-item-0", content: "Item 5" },
        { id: "2-item-1", content: "Item 6" },
      ],
    },
  ];
  

{/* <div className="container">
<div className="box">Backlog</div>
<div className="box">To Do</div>
<div className="box">In Progress</div>
<div className="box">MVP</div>
<div className="box">Done</div>
</div> */}

const Headers = () => {
  const [headers, setHeaders] = useState(initialHeaders);

  const handleOnDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;
  
    if (type === "header") {
      const items = Array.from(headers);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setHeaders(items);
    } else {
      const sourceHeaderIndex = source.droppableId.split("-")[1];
      const destHeaderIndex = destination.droppableId.split("-")[1];
  
      const sourceItems = Array.from(headers[sourceHeaderIndex].items);
      const [reorderedItem] = sourceItems.splice(source.index, 1);
  
      if (source.droppableId === destination.droppableId) {
        sourceItems.splice(destination.index, 0, reorderedItem);
        setHeaders((prev) => {
          const newHeaders = [...prev];
          newHeaders[sourceHeaderIndex].items = sourceItems;
          return newHeaders;
        });
      } else {
        const destItems = Array.from(headers[destHeaderIndex].items);
        destItems.splice(destination.index, 0, reorderedItem);
        setHeaders((prev) => {
          const newHeaders = [...prev];
          newHeaders[sourceHeaderIndex].items = sourceItems;
          newHeaders[destHeaderIndex].items = destItems;
          console.log(newHeaders)
          return newHeaders;
        });
      }
    }
  };
  

  
  

  return (
<div>
  <DragDropContext onDragEnd={handleOnDragEnd}>
    <Droppable droppableId="headers" direction="horizontal" type="header">
      {(provided) => (
        <div className="container" {...provided.droppableProps} ref={provided.innerRef}>
          {headers.map(({ id, name, items }, index) => (
            <Draggable key={id} draggableId={id} index={index}>
              {(provided) => (
                <div
                  className="box"
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <p>{name}</p>
                  <Droppable droppableId={`column-${index}`} type="item">
                    {(provided, snapshot) => (
                      <div
                        className={`item-container ${
                          snapshot.isDraggingOver ? "dragging-over" : ""
                        }`}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {items.map(({ id, content }, index) => (
                          <Draggable key={id} draggableId={id} index={index}>
                            {(provided) => (
                              <div
                                className="item"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              >
                                {content}
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
</div>

  );

};

export default Headers;
