import React, { useState } from "react";

function AssignUsers({ imageSrc, username, onClick }) {
  const [grayedOut, setGrayedOut] = useState(true);
  const [showUsername, setShowUsername] = useState(false);

  const handleMouseEnter = () => {
    setShowUsername(true);
  };

  const handleMouseLeave = () => {
    setShowUsername(false);
  };

  const handleClick = () => {
    setGrayedOut(!grayedOut);
    onClick();
  };

  const imageStyle = {
    opacity: grayedOut ? "0.5" : "1",
  };

  return (
    <div className="inline-block relative">
      <img
        src={imageSrc}
        alt="Profile"
        className="w-12 h-12 rounded-full cursor-pointer"
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={imageStyle}
      />
      {showUsername && (
        <div className="z-10 absolute top-1/2 left-full transform -translate-y-1/2 p-2 bg-gray-900 text-white rounded-lg shadow-lg">
          {username}
        </div>
      )}
    </div>
  );
}

export default AssignUsers;
