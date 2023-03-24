import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import {
  Home,
  Dashboard,
  Login,
  Registration,
  NotFoundPage,
  Board,
  FancyMenu,
  Settings,
  AllBoards,
  Ticket,
} from "./pages";

import AISteps from "./components/AI";

import PageWrapper from "./components/PageWrapper";

import "./index.css";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<PageWrapper />}>
          <Route path="/register" element={<Registration />} />
          <Route index path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/board/:id" element={<Board />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/all-boards" element={<AllBoards />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/ai-steps" element={<AISteps />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
