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
  BoardTest,
  Settings,
  AllBoards,
  Ticket
} from "./pages";

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
          <Route path="/" element={<BoardTest />} >
            <Route path="/board" element={<Board />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/all-boards" element={<AllBoards />} />
            <Route path="/ticket" element={<Ticket />} />
          </Route>
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
