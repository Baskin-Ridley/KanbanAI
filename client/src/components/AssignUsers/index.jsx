import React, { useState } from "react";

function AssignUsers({ imageSrc, onClick }) {
  const [grayedOut, setGrayedOut] = useState(true);

  const handleClick = () => {
    setGrayedOut(!grayedOut);
    onClick();
  };

  const imageClassName = grayedOut
    ? "w-12 h-12 rounded-full opacity-50 cursor-pointer"
    : "w-12 h-12 rounded-full cursor-pointer";

  return (
    <div className="inline-block">
      <img
        src={imageSrc}
        alt="Profile"
        className={imageClassName}
        onClick={handleClick}
      />
    </div>
  );
}

export default AssignUsers;
