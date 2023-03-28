import React, { useState } from 'react'

const EditableHeader = ({ id, name, onNameChange, setHeaders }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [headerName, setHeaderName] = useState(name);
  
    const handleNameChange = (e) => {
      setHeaderName(e.target.value);
    };
  
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        setIsEditing(false);
        onNameChange(id, headerName);
      }
    };
  
    const handleBlur = () => {
      setIsEditing(false);
      onNameChange(id, headerName);
    };
  
    return isEditing ? (
      <input
        className="text-lg font-bold mb-2 text-center w-full"
        type="text"
        value={headerName}
        onChange={handleNameChange}
        onBlur={handleBlur}
        onKeyPress={handleKeyPress}
        autoFocus
      />
    ) : (
      <h2
        className="text-lg font-bold mb-2 text-center cursor-pointer"
        onClick={() => setIsEditing(true)}
      >
        {headerName}
      </h2>
    );
  };
  
  const Headers = ({ board_id }) => {
    // ... all other code
  
    const handleHeaderNameChange = (headerId, newName) => {
      const updatedHeaders = headers.map((header) =>
      header.id === headerId ? { ...header, name: newName } : header
    );
    setHeaders(updatedHeaders);

    // Add code to save the updated header name to your backend
    const updatedHeaderId = headerId.split('-')[1];
    fetch(`https://built-differently-backend.onrender.com/kanban-board/${board_id}/kanban-headers/${updatedHeaderId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: newName }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update header name");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Header name updated successfully", data);
      })
      .catch((error) => {
        console.error("Error updating header name:", error);
        alert("Failed to update header name");
      });
  };
}
