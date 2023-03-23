import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import Navigation from './index.jsx';
import '@testing-library/jest-dom';

test('renders without errors', () => {
  const mockUser = { id: 1, username: 'testuser' };
  const mockLogout = jest.fn();
  const navigateMock = jest.fn();

  render(
    <MemoryRouter>
      <UserContext.Provider value={{ user: mockUser, logout: mockLogout }}>
        <Navigation />
      </UserContext.Provider>
    </MemoryRouter>
  );

});
