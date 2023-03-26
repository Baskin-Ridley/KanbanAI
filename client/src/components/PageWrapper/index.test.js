import React from 'react';
import { render } from '@testing-library/react';
import Header from '../Header';
import Navigation from '../Navigation';
import Message from '../Message';
import Footer from '../Footer';
import { NavLink, Outlet } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import PageWrapper from './index.jsx';

const UserContext = React.createContext({
  user: { username: "user1" },
  login: () => {},
  logout: () => {}
});

describe('PageWrapper', () => {
  test('should render Header, Navigation, Message, Outlet, and Footer components', () => {
    const { getByTestId } = render(
      <UserContext.Provider value={{ user: {username: "user1"}, logout: () => {} }}>
        <PageWrapper />
      </UserContext.Provider>
    );

  });
});
