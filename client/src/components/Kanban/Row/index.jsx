import React from "react";
import SortableList from "../SortableList/index.jsx";
const Row = (props) => {
  return (
    <div className="column">
      <h2>{props.title}</h2>
      <SortableList tasks={props.tasks} />
    </div>
  );
};

export default Row;
