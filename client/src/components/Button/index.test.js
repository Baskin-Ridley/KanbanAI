import React from 'react';
import { render } from '@testing-library/react';
import Button from './index.jsx';
import '@testing-library/jest-dom';


describe('Button', () => {
  test('renders without error', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <Button onClick={mockOnClick}>Click me!</Button>
    );
  });
});
