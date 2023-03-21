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
} from "./pages";

import PageWrapper from "./components/PageWrapper"; // Import PageWrapper

import "./index.css";

function App() {
  return (
    // <UserProvider>
      <Routes>
        {/* <Route path="/" element={<PageWrapper />}> */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/git" element={<Git />} />
        <Route path="/board" element={<Board />} />
        <Route path="/stack" element={<Stack />} />
        {/* </Route> */}
      </Routes>
<<<<<<< HEAD
    </UserProvider>
=======
    // </UserProvider >
>>>>>>> 955a9f86e7ae181d7fb39af697de0127deb899bd
  );
}

export default App;
