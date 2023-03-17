import React from 'react';

const Message = ({ message, type }) => {
  if (!message) {
    return null;
  }

  const messageClass = type === 'error' ? 'message-container w3-panel w3-red w3-padding' : 'message-container w3-panel w3-green w3-padding';

  return (
    <div className={messageClass}>
      <p>{message}</p>
    </div>
  );
};

export default Message;
