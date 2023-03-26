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
  Settings,
  AllBoards,
  Ticket,
} from "./pages";

import AISteps from "./components/AI";
import PageWrapper from "./components/PageWrapper";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<PageWrapper />}>
          <Route path="/register" element={<Registration />} />
          <Route index path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
<<<<<<< HEAD
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/board/:id" element={<Board />} />
          <Route path="/bt" element={<BoardTest />} />
=======
          <Route path="/board/:id" element={<Board />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFoundPage />} />
>>>>>>> f4b8f1bf3434733c1dbb630f8301236833e076ef
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
