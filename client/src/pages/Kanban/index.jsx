import React, { useState } from "react";

import { TaskHeaders, TaskTickets } from "../../components/Kanban/index.jsx";

const Kanban = () => {
  return (
    <>
      <TaskHeaders />
      <TaskTickets />
    </>
  );
};

export default Kanban;
