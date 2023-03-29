import React, { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Form_Button from "../../Form_Button";
import Form_Input from "../../Form_Input";
import TicketPopUp from "../TicketPopUp";
import CreateTicketPopUp from "../CreateTicketPopUp";
import { FetchKBD, FetchTickets } from "../index";

const Headers = ({ board_id }) => {
  const initialHeaders = [];
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [responseData, setResponseData] = useState("");

  if (isOpen || isOpenCreate) {
    document.body.style.overflowY = "hidden";
  } else {
    document.body.style.overflowY = "auto";
  }

  function handleTicketClick(ticketContent) {
    setSelectedTicket(ticketContent.content);
    setIsOpen(true);
  }
  const [currentHeaderId, setCurrentHeaderId] = useState(null);

  function handleNewItemClick(headerId) {
    setCurrentHeaderId(headerId);
    setIsOpenCreate(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  const updatePositions = (items) => {
    fetch(
      `https://built-differently-backend.onrender.com/kanban-board/${board_id}/positions`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ positions: items }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update header positions");
        }
        return response.json();
      })
      .then((data) => {
        // console.log("Header positions updated successfully", data);
      })
      .catch((error) => {
        console.error("Error updating header positions:", error);
        alert("Failed to update header positions");
      });
  };

  const fetchData = async () => {
    const boardData = await FetchKBD(board_id);
    setResponseData(boardData);
    const ticketsData = await FetchTickets(board_id);

    const headersData = Array.isArray(boardData.boards_headers)
      ? boardData.boards_headers
      : [boardData.boards_headers];

    const updatedHeaders = headersData.map((header) => {
      const headerTickets = ticketsData.filter(
        (ticket) => ticket.header_id === header.header_id
      );
      return {
        id: `header-${header.header_id}`,
        name: header.header_name,
        items: headerTickets.map((ticket) => ({
          id: `item-${ticket.ticket_id}`,
          content: ticket.ticket_content,
        })),
      };
    });
    // new code below
    if (boardData.positions) {
      setHeaders(boardData.positions.position_data);
    } else {
      setHeaders(updatedHeaders);
    }
    // previous code below
    // updatePositions(updatedHeaders)
    // setHeaders(updatedHeaders);
  };

  const [headers, setHeaders] = useState(initialHeaders);
  const [newItemNames, setNewItemNames] = useState(headers.map(() => ""));
  const [newHeaderName, setNewHeaderName] = useState("");

  const handleAddHeader = () => {
    if (newHeaderName.trim() === "") {
      alert("Please enter a header name");
      return;
    }

    fetch(
      `https://built-differently-backend.onrender.com/kanban-board/${board_id}/kanban-headers`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newHeaderName }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create a new header");
        }
        return response.json();
      })
      .then((data) => {
        const newHeader = {
          id: `header-${data.header.header_id}`,
          header_id: data.header.header_id,
          name: data.header.header_name,
          tickets_under_this_header: data.header.tickets_under_this_header,
          items: [],
        };

        setHeaders(
          (prevState) => [...prevState, newHeader],
          console.log(headers)
        );
        setNewHeaderName("");
      })
      .catch((error) => {
        console.error("Error creating a new header:", error);
        alert("Failed to create a new header");
      });
  };

  const handleDeleteHeader = (headerId) => {
    const headerIndex = headers.findIndex((header) => header.id === headerId);
    const headerToDelete = headers[headerIndex];
    const headerIdToDelete = headerToDelete.id.split("-")[1];

    fetch(
      `https://built-differently-backend.onrender.com/kanban-board/${board_id}/kanban-headers/${headerIdToDelete}`,
      {
        method: "DELETE",
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete the header");
        }
        return response.json();
      })
      .then(() => {
        const newHeaders = headers.filter((_, index) => index !== headerIndex);
        setHeaders(newHeaders);
      })
      .catch((error) => {
        console.error("Error deleting the header:", error);
        alert("Failed to delete the header");
      });
  };

  useEffect(() => {
    updatePositions(headers);
  }, [headers]);

  useEffect(() => {
    setNewItemNames(headers.map(() => ""));
  }, [headers]);

  const handleOnDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === "header") {
      const items = Array.from(headers);
      const [reorderedItem] = items.splice(source.index, 1);
      items.splice(destination.index, 0, reorderedItem);
      setHeaders(items);
      // updatePositions(items)
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
        setHeaders([...headers]);
      } else {
        const sourceHeader = headers[sourceHeaderIndex];
        const destinationHeader = headers[destinationHeaderIndex];
        const [movedItem] = sourceHeader.items.splice(source.index, 1);
        destinationHeader.items.splice(destination.index, 0, movedItem);
        setHeaders([...headers]);
      }
    }
  };

  const [editingHeaderName, setEditingHeaderName] = useState(null);

  const handleHeaderNameEdit = (headerId, newName) => {
    const headerIndex = headers.findIndex((header) => header.id === headerId);
    const headerToEdit = headers[headerIndex];
    const headerIdToEdit = headerToEdit.id.split("-")[1];

    fetch(
      `https://built-differently-backend.onrender.com/kanban-board/${board_id}/kanban-headers/${headerIdToEdit}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update the header name");
        }
        return response.json();
      })
      .then(() => {
        const newHeaders = [...headers];
        newHeaders[headerIndex] = {
          ...headerToEdit,
          name: newName,
        };
        setHeaders(newHeaders);
      })
      .catch((error) => {
        console.error("Error updating the header name:", error);
        alert("Failed to update the header name");
      })
      .finally(() => {
        setEditingHeaderName(null);
      });
  };

  return (
    <div>
      <CreateTicketPopUp
        board_id={board_id}
        setIsOpenCreate={setIsOpenCreate}
        isOpenCreate={isOpenCreate}
        id={currentHeaderId}
        headers={headers}
        setHeaders={setHeaders}
        newItemNames={newItemNames}
        setNewItemNames={setNewItemNames}
        fetchData={fetchData}
        updatePositions={updatePositions}
      />
      <div>
        {selectedTicket && (
          <div className="">
            <TicketPopUp
              ticketContent={selectedTicket}
              setIsOpen={setIsOpen}
              isOpen={isOpen}
              fetchData={fetchData}
            />
          </div>
        )}
      </div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="headers" direction="horizontal" type="header">
          {(provided) => (
            <div
              className="flex items-start"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {headers.map(({ id, name, items }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <div
                      className="m-2 w-64 rounded-lg border border-gray-400 bg-blue-50 px-2 py-3 "
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <div className="flex justify-center items-center">
                        {editingHeaderName === id ? (
                          <Form_Input
                            type="text"
                            value={name}
                            tabIndex={0}
                            onChange={(e) =>
                              setHeaders((prevState) =>
                                prevState.map((header) =>
                                  header.id === id
                                    ? { ...header, name: e.target.value }
                                    : header
                                )
                              )
                            }
                            onBlur={(e) => {
                              setTimeout(
                                () => handleHeaderNameEdit(id, e.target.value),
                                100
                              );
                            }}
                            onKeyDown={(e) => {
                              console.log(e.key);
                              if (e.key === "Escape") {
                                setEditingHeaderName(null);
                                e.target.blur();
                              } else if (e.key === "Enter") {
                                handleHeaderNameEdit(id, e.target.value);
                                e.preventDefault();
                                e.target.blur();
                              }
                            }}
                          />
                        ) : (
                          <div
                            onClick={() => setEditingHeaderName(id)}
                            tabIndex="0"
                          >
                            <h2 className="text-lg font-bold mb-2 hover:cursor-pointer">
                              {name}
                            </h2>
                          </div>
                        )}
                        <button
                          className="w-20-% mb-2 ml-2 h-8 rounded-md bg-red-500 px-2 py-1 text-white hover:bg-black hover:text-white"
                          onClick={() => handleDeleteHeader(id)}
                        >
                          Delete
                        </button>
                      </div>
                      <Droppable droppableId={`column-${id}`} type="item">
                        {(provided) => (
                          <div
                            className="min-h-20 rounded-lg border-dashed border-transparent bg-gray-100 p-2 transition-colors duration-150 hover:border-gray-400 hover:bg-blue-200"
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
                                    className={`mb-2 rounded-md bg-white py-2 px-4 text-sm shadow-md transition-colors duration-150 hover:bg-blue-300 hover:text-white ${
                                      !content && "hidden"
                                    }`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    onClick={() =>
                                      handleTicketClick({ content })
                                    }
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
                      <Form_Button
                        onClick={() => handleNewItemClick(id)}
                        buttonText="Add Ticket"
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              <Draggable
                id="new-header"
                key="new-header"
                draggableId="new-header"
                index={headers.length}
              >
                {(provided) => (
                  <div
                    className="m-2 w-64 rounded-lg border border-gray-400 bg-blue-50 px-2 py-3"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Form_Input
                      type="text"
                      value={newHeaderName}
                      onChange={(e) => setNewHeaderName(e.target.value)}
                      ariaLabel="Field in which to type new header"
                    />
                    <Form_Button
                      buttonText="Add Header"
                      onClick={handleAddHeader}
                      ariaLabel="Button for adding new header"
                    />
                  </div>
                )}
              </Draggable>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};

export default Headers;
