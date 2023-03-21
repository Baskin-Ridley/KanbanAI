import React from "react";

const Card = () => {
  const { task, isDragging } = props;

  return (
    <div className={`card ${isDragging ? "is-dragging" : ""}`}>
      {task.title}
    </div>
  );
};

export default Card;
