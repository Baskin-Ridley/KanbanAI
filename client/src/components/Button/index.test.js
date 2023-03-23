import React from 'react';
import { render } from '@testing-library/react';
import Button from './index.jsx';

describe('Button', () => {
  test('renders without error', () => {
    const mockOnClick = jest.fn();
    const { getByText } = render(
      <Button onClick={mockOnClick}>Click me!</Button>
    );
  });
});
