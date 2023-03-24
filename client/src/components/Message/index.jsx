import React from 'react';

const Message = ({ message, type }) => {
  if (!message) {
    return null;
  }

  const messageClass = type === 'error' 
    ? 'message-container bg-orange-500 text-white border-red-500 border-2 p-4'
    : 'message-container bg-blue-500 text-white border-blue-500 border-2 p-4';

  return (
    <div className={`rounded-md ${messageClass}`}>
      <p>{message}</p>
    </div>
  );
};

export default Message;
