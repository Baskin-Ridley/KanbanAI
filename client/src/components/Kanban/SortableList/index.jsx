import React from "react";
import SortableItem from "../SortableItem/index";
const SortableList = (props) => {
  console.log(props);
  return (
    <>
      {props.tasks.map((task) => (
        <SortableItem key={task.id} task={task} />
      ))}
    </>
  );
};

export default SortableList;
