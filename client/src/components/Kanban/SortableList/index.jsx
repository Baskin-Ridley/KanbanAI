import React from "react";
import { Accessibility } from "@dnd-kit/accessibility";
const SortableList = (props) => {
  return (
    <Accessibility>
      {props.tasks.map((task) => (
        <SortableItem key={task.id} task={task} />
      ))}
    </Accessibility>
  );
};

export default SortableList;
