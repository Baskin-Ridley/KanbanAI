import { render, screen } from '@testing-library/react';
import FancyMenu from './index.jsx';
import React from 'react';
import { act } from 'react-dom/test-utils';
import '@testing-library/jest-dom';

global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
  })
);

jest.mock('../../context/UserContext', () => ({
  useView: jest.fn(() => ({
    stackView: 'mockedStackView',
    setStackView: jest.fn(),
    gitView: 'mockedGitView',
    setGitView: jest.fn(),
  })),
}));

jest.mock('../../components/GitCard', () => {
  return function MockGitCommitCard() {
    return <div>Mock Git Commit Card</div>;
  };
});

describe('FancyMenu', () => {
  test('renders without error', () => {
    render(<FancyMenu />);
  });
});
