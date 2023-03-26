import React from 'react';
import { render } from '@testing-library/react';
import Message from './index.jsx';
import '@testing-library/jest-dom';

test('renders error message', () => {
  const errorMessage = 'An error occurred';
  const { getByText } = render(<Message message={errorMessage} type="error" />);
  const messageElement = getByText(errorMessage);
});

test('renders success message', () => {
  const successMessage = 'Operation successful';
  const { getByText } = render(<Message message={successMessage} type="success" />);
  const messageElement = getByText(successMessage);
});

test('does not render when message is null', () => {
  const { container } = render(<Message message={null} type="success" />);
});
