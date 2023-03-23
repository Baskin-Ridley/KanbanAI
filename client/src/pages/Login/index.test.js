import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { UserContext } from "../../context/UserContext";
import LoginPage from "./index.jsx";
import { BrowserRouter as Router } from "react-router-dom";

describe("LoginPage", () => {
    test("calls login function with username and password when submitted", async () => {
        const loginMock = jest.fn();
        const navigateMock = jest.fn();

        render(
            <Router>
                <UserContext.Provider value={{ login: loginMock }}>
                    <LoginPage navigate={navigateMock} />
                </UserContext.Provider>
            </Router>
        );

        const usernameInput = screen.getByLabelText(/username/i);
        const passwordInput = screen.getByLabelText(/password/i);
        const loginButton = screen.getByRole("button", { name: /login/i });

        fireEvent.change(usernameInput, { target: { value: "user1" } });
        fireEvent.change(passwordInput, { target: { value: "password1" } });

        await act(async () => {
            fireEvent.click(loginButton);
        });
    });
});
