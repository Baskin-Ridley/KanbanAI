import React from 'react';
import { render } from '@testing-library/react';
import { UserContext } from '../../context/UserContext';
import Registration from './index.jsx';
import { BrowserRouter as Router } from "react-router-dom";
import '@testing-library/jest-dom';

describe('Registration', () => {
    test('renders without error', () => {
        const registerMock = jest.fn();
        const navigateMock = jest.fn();
        render(
            <Router>
                <UserContext.Provider value={{ register: registerMock }}>
                    <Registration navigate={navigateMock} />
                </UserContext.Provider>
            </Router>
        );
    });
});
