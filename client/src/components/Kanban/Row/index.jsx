import React from "react";
import { SortableList } from "../SortableList/Index.jsx";
const Column = (props) => {
  return (
    <div className="column">
      <h2>{props.title}</h2>
      <SortableList tasks={props.tasks} />
    </div>
  );
};

export default Column;
