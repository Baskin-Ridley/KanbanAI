import { render, screen } from '@testing-library/react';
import BoardTest from './index.jsx';
import React from 'react';

jest.mock('../../context/UserContext', () => ({
  useView: jest.fn(() => ({
    stackView: 'mockedStackView',
    setStackView: jest.fn(),
    gitView: 'mockedGitView',
    setGitView: jest.fn(),
  })),
}));

test('renders without error', () => {
  render(<BoardTest />);
});
