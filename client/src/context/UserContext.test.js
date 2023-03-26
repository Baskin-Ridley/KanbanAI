import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserProvider, useView, UserContext } from './UserContext';

describe('UserProvider', () => {
  test('login function is defined', () => {
    const TestComponent = () => {
      const { login } = useView();
      expect(login).toBeDefined();
      return null;
    };
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
  });

  test('logout function is defined', () => {
    const TestComponent = () => {
      const { logout } = useView();
      expect(logout).toBeDefined();
      return null;
    };
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
  });

  test('register function is defined', () => {
    const TestComponent = () => {
      const { register } = useView();
      expect(register).toBeDefined();
      return null;
    };
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );
  });
});
