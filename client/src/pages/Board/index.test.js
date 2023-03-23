import React from 'react';
import { render } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import Board from './index.jsx';
import '@testing-library/jest-dom';

jest.mock('react-router-dom', () => ({
  useParams: jest.fn(),
}));

jest.mock('../../components/Board', () => ({
  Headers: jest.fn(() => <div>Mocked Headers</div>),
}));

describe('Board', () => {
  test('renders without error', () => {
    useParams.mockReturnValue({ id: 'mockedId' });
    render(<Board />);
  });
});
