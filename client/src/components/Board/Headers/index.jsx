import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "./style.css";

const initialHeaders = [
  {
    id: "header-1",
    name: "Header 1",
    items: [
      { id: "0-item-0", content: "Item 1" },
      { id: "0-item-1", content: "Item 2" },
    ],
  },
  {
    id: "header-2",
    name: "Header 2",
    items: [
      { id: "1-item-0", content: "Item 3" },
      { id: "1-item-1", content: "Item 4" },
    ],
  },
  {
    id: "header-3",
    name: "Header 3",
    items: [
      { id: "2-item-0", content: "Item 5" },
      { id: "2-item-1", content: "Item 6" },
    ],
  },
];

const Headers = () => {
  const [headers, setHeaders] = useState(initialHeaders);

  const [newItemNames, setNewItemNames] = useState(headers.map(() => ""));

  const handleNewItemNameChange = (headerId, newValue) => {
    setNewItemNames((prevState) =>
      prevState.map((name, index) =>
        headers[index].id === headerId ? newValue : name
      )
    );
  };

  const handleAddSubItem = (headerId) => {
    const headerIndex = headers.findIndex((header) => header.id === headerId);
    const itemName = newItemNames[headerIndex];
    if (itemName) {
      const newSubItemId = `item-${Date.now()}`;
      const newSubItem = { id: newSubItemId, content: itemName };

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
  };

  const handleOnDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === "header") {
      const items = Array.from(headers);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setHeaders(items);
    } else if (type === "item") {
      const sourceHeaderIndex = headers.findIndex(
        (header) => `column-${header.id}` === source.droppableId
      );
      const destinationHeaderIndex = headers.findIndex(
        (header) => `column-${header.id}` === destination.droppableId
      );

      if (sourceHeaderIndex === destinationHeaderIndex) {
        const header = headers[sourceHeaderIndex];
        const newItems = Array.from(header.items);
        const [reorderedItem] = newItems.splice(source.index, 1);
        newItems.splice(destination.index, 0, reorderedItem);
        header.items = newItems;
        console.log(newItems);
        setHeaders([...headers]);
      } else {
        const sourceHeader = headers[sourceHeaderIndex];
        const destinationHeader = headers[destinationHeaderIndex];
        const [movedItem] = sourceHeader.items.splice(source.index, 1);
        destinationHeader.items.splice(destination.index, 0, movedItem);
        setHeaders([...headers]);
        console.log(destinationHeader.items);
      }
    }
  };

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="headers" direction="horizontal" type="header">
          {(provided) => (
            <div
              className="container"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
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
                      <Droppable droppableId={`column-${id}`} type="item">
                        {(provided) => (
                          <div
                            className="item-container"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                          >
                            {items.map(({ id, content }, index) => (
                              <Draggable
                                key={id}
                                draggableId={id}
                                index={index}
                              >
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
                      <input
                        type="text"
                        className="new-item-input"
                        value={newItemNames[index]}
                        onChange={(e) =>
                          handleNewItemNameChange(id, e.target.value)
                        }
                      />
                      <button onClick={() => handleAddSubItem(id)}>
                        Add Item
                      </button>
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
