import React, { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Button from "../../Button";
import Input from "../../Input";
import TicketPopUp from "../TicketPopUp";
import CreateTicketPopUp from "../CreateTicketPopUp";
import "./style.css";

const initialHeaders = [];

const Headers = ({ board_id }) => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenCreate, setIsOpenCreate] = useState(false);

  const [responseData, setResponseData] = useState("");

  function handleTicketClick(ticketContent) {
    setSelectedTicket(ticketContent.content);
    setIsOpen(true);
    console.log(selectedTicket);
  }

  function handleNewItemClick() {
    setIsOpenCreate(true);
  }

  const fetchKanbanBoardData = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/kanban-boards/${board_id}`
      );
      const data = await response.json();

      const header = data.boards_headers[0];
      setResponseData(data);

      return data;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  //Loads tickets of this kanban board
  const fetchKanbanBoardTickets = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/kanban-boards/${board_id}/tickets`
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching tickets:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const boardData = await fetchKanbanBoardData();
    setResponseData(boardData)
    const ticketsData = await fetchKanbanBoardTickets();

    const headersData = Array.isArray(boardData.boards_headers)
      ? boardData.boards_headers
      : [boardData.boards_headers];

    const updatedHeaders = headersData.map((header) => {
      const headerTickets = ticketsData.filter(
        (ticket) => ticket.header_id === header.header_id
      );
      // console.log(headerTickets[0])
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

  const handleAddHeader = () => {
    if (newHeaderName.trim() === "") {
      alert("Please enter a header name");
      return;
    }
    const newHeaderId = `header-${newHeaderName}`;
    const newHeader = {
      id: newHeaderId,
      header_id: newHeaderId,
      name: newHeaderName,
      header_name: newHeaderName,
      tickets_under_this_header: [],
      items: [],
    };
    console.log(newHeader);

    setHeaders((prevState) => [...prevState, newHeader]);
    setNewHeaderName("");
  };

  const handleNewItemNameChange = (headerId, newValue) => {
    setNewItemNames((prevState) =>
      prevState.map((name, index) =>
        headers[index].id === headerId ? newValue : name
      )
    );
  };

  useEffect(() => {
    setNewItemNames(headers.map(() => ""));
    console.log(headers);
  }, [headers]);

  const handleAddSubItem = async (headerId) => {
    const headerIndex = headers.findIndex((header) => header.id === headerId);
    const itemName = newItemNames[headerIndex];
    if (itemName) {
      const newSubItemId = `item-${itemName.trim()}`;
      const newSubItem = { id: newSubItemId, content: itemName };
      console.log(headers[headerIndex]);
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
          header_id: responseData.boards_headers[headerIndex].header_id,
          ticket_status: "open",
          kanban_board_id: board_id,
        }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error adding new item:", error);
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
        // console.log(newItems);
        setHeaders([...headers]);
      } else {
        const sourceHeader = headers[sourceHeaderIndex];
        const destinationHeader = headers[destinationHeaderIndex];
        const [movedItem] = sourceHeader.items.splice(source.index, 1);
        destinationHeader.items.splice(destination.index, 0, movedItem);
        setHeaders([...headers]);
        // console.log(destinationHeader.items);
        // console.log(headers, 'headers')
      }
    }
    // LOGIC FOR UPDATING DB WITH TICKET?HEADERS POSTIONS HERE:
  };

  return (
    <div>
      <button onClick={handleNewItemClick}>open create</button>
      <CreateTicketPopUp
        setIsOpenCreate={setIsOpenCreate}
        isOpenCreate={isOpenCreate}
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
                      <Input type="text"
                        // className="p-2 bg-gray-100 rounded-lg border border-gray-400 mb-2"
                        value={newItemNames[index]}
                        onChange={(e) =>
                          handleNewItemNameChange(id, e.target.value)
                        }
                      />
                      <Button onClick={handleNewItemClick}>Add Item</Button>
                      <CreateTicketPopUp
                        setIsOpenCreate={setIsOpenCreate}
                        isOpenCreate={isOpenCreate}
                        id={id}
                        headers={headers}
                        setHeaders={setHeaders}
                        newItemNames={newItemNames}
                        setNewItemNames={setNewItemNames}
                        handleAddSubItem={handleAddSubItem}
                      />{" "}
                    </div>
                  )}
                </Draggable>
              ))}
              <Draggable key="new-header" draggableId="new-header" index={headers.length}>
                {(provided) => (
                  <div
                    className="w-64 bg-gray-200 border border-gray-400 rounded-lg px-2 py-3 m-2"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Input
                      type="text"
                      value={newHeaderName}
                      onChange={(e) => setNewHeaderName(e.target.value)}
                    />
                    <Button onClick={handleAddHeader}>Add Header</Button>
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
