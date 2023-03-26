import React from "react";
import { render, screen } from "@testing-library/react";
import { UserContext } from "../../context/UserContext";
import LoginPage from "./index.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom';

describe("LoginPage", () => {
  test("calls login function with username and password when submitted", async () => {
    const loginMock = jest.fn();
    const navigateMock = jest.fn();
    const username = "user1";
    const password = "password1";

    render(
      <Router>
        <UserContext.Provider value={{ login: loginMock }}>
          <LoginPage navigate={navigateMock} username={username} password={password} />
        </UserContext.Provider>
      </Router>
    );

  });
});
