import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserContext } from '../../context/UserContext';
import Dashboard from './index.jsx';

describe('Dashboard', () => {
  test('renders user dashboard', () => {
    const user = { username: 'mockedUser' };
    render(
      <UserContext.Provider value={{ user }}>
        <Dashboard />
      </UserContext.Provider>
    );
  });
});
