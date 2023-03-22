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

import PageWrapper from "./components/PageWrapper";

import "./index.css";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<PageWrapper />}>
          <Route path="/register" element={<Registration />} />
          <Route index path="/login" element={<Login />} />
          <Route path="/board" element={<Board />} />
          <Route path="/" element={<Home />} />
          <Route path="/" element={<BoardTest />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/git" element={<Git />} />
            <Route path="/board" element={<Board />} />
            <Route path="/stack" element={<Stack />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
