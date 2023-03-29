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
  Registration_member,
  Business,
  ChartTest,
} from "./pages";

import AISteps from "./components/AI";
import PageWrapper from "./components/PageWrapper";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/business" element={<Business />} />

        <Route path="/" element={<PageWrapper />}>
          <Route path="/register" element={<Registration />} />
          <Route path="/register/:supervisors" element={<Registration_member />} />
          <Route index path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/board/:id" element={<Board />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/all-boards" element={<AllBoards />} />
          <Route path="/ticket" element={<Ticket />} />
          <Route path="/chart-test" element={<ChartTest />} />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;
