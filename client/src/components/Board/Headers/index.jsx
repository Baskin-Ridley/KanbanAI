import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Form_Button from "../../Form_Button";
import Form_Input from "../../Form_Input";
import TicketPopUp from "../TicketPopUp";
import CreateTicketPopUp from "../CreateTicketPopUp";
const initialHeaders = [];
import { FetchKBD, FetchTickets } from "../index";

const Headers = ({ board_id }) => {
  const initialHeaders = [];
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);
  const [responseData, setResponseData] = useState("");

  function handleTicketClick(ticketContent) {
    setSelectedTicket(ticketContent.content);
    setIsOpen(true);
    console.log(selectedTicket);
  }
  const [currentHeaderId, setCurrentHeaderId] = useState(null);

  function handleNewItemClick(headerId) {
    setCurrentHeaderId(headerId);
    setIsOpenCreate(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

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

    setHeaders(updatedHeaders);
  };

  const [headers, setHeaders] = useState(initialHeaders);
  const [newItemNames, setNewItemNames] = useState(headers.map(() => ""));
  const [newHeaderName, setNewHeaderName] = useState("");

  // const handleAddHeader = () => {
  //   if (newHeaderName.trim() === "") {
  //     alert("Please enter a header name");
  //     return;
  //   }
  //   const newHeaderId = `header-${newHeaderName}`;
  //   const newHeader = {
  //     id: newHeaderId,
  //     header_id: newHeaderId,
  //     name: newHeaderName,
  //     header_name: newHeaderName,
  //     tickets_under_this_header: [],
  //     items: [],
  //   };
  //   console.log(newHeader);

  //   setHeaders((prevState) => [...prevState, newHeader]);
  //   setNewHeaderName("");
  // };

const handleAddHeader = () => {
  if (newHeaderName.trim() === "") {
    alert("Please enter a header name");
    return;
  }
  
  fetch(`http://localhost:5000/kanban-board/${board_id}/kanban-headers`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: newHeaderName }),
  })
  .then((response) => {
    if (!response.ok) {
      throw new Error("Failed to create a new header");
    }
    return response.json();
  })
  .then((data) => {
    const newHeader = {
      id: `header-${newHeaderName}`,
      header_id: data.header_id,
      name: data.header_name,
      tickets_under_this_header: [],
      items: [],
    };
  
    setHeaders((prevState) => [...prevState, newHeader]);
    setNewHeaderName("");
  })
  .catch((error) => {
    console.error("Error creating a new header:", error);
    alert("Failed to create a new header");
  });
};
     
  

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
    // LOGIC FOR UPDATING DB WITH TICKET?HEADERS POSTIONS HERE:
  };

  return (
    <div>
      <CreateTicketPopUp
        setIsOpenCreate={setIsOpenCreate}
        isOpenCreate={isOpenCreate}
        id={currentHeaderId}
        headers={headers}
        setHeaders={setHeaders}
        newItemNames={newItemNames}
        setNewItemNames={setNewItemNames}
        fetchData={fetchData}
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
              className="flex justify-between"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {headers.map(({ id, name, items }, index) => (
                <Draggable key={id} draggableId={id} index={index}>
                  {(provided) => (
                    <div
                      className="w-64 bg-gray-200 border border-gray-400 rounded-lg px-2 py-3 m-2"
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <h2 className="text-lg font-bold mb-2">{name}</h2>
                      <Droppable droppableId={`column-${id}`} type="item">
                        {(provided) => (
                          <div
                            className="min-h-20 p-2 bg-gray-100 rounded-lg border-dashed border-transparent hover:border-gray-400 hover:bg-gray-200 transition-colors duration-150"
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
                                    className="bg-white rounded-md py-2 px-4 mb-2 text-sm shadow-md hover:bg-blue-500 hover:text-white transition-colors duration-150"
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
                key="new-header"
                draggableId="new-header"
                index={headers.length}
              >
                {(provided) => (
                  <div
                    className="w-64 bg-gray-200 border border-gray-400 rounded-lg px-2 py-3 m-2"
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
