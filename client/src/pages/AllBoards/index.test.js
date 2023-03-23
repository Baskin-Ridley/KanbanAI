import React from "react";
import { render, screen } from "@testing-library/react";
import { UserContext } from "../../context/UserContext";
import AllBoards from "./index.jsx";
import { BrowserRouter as Router } from "react-router-dom";
import { act } from "react-dom/test-utils";
import "@testing-library/jest-dom";

describe("AllBoards", () => {
  test("renders without error", async () => {
    const mockUser = { id: 1 };
    const mockBoards = [
      { id: 1, title: "Board 1" },
      { id: 2, title: "Board 2" },
    ];
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockBoards),
      })
    );
    await act(async () => {
      render(
        <Router>
          <UserContext.Provider value={{ user: mockUser }}>
            <AllBoards />
          </UserContext.Provider>
        </Router>
      );
    });
  });
});
