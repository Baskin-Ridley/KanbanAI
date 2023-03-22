import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import {
  Home,
  Dashboard,
  Login,
  Registration,
  NotFoundPage,
  Git,
  Stack,
  Board,
  BoardTest
} from "./pages";

import PageWrapper from "./components/PageWrapper"; // Import PageWrapper

import "./index.css";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<PageWrapper />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/git" element={<Git />} />
          <Route path="/board" element={<Board />} />
          <Route path="/stack" element={<Stack />} />
          <Route path="/bt" element={<BoardTest />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
