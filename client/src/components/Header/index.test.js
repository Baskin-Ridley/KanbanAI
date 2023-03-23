import React from 'react';
import { render } from '@testing-library/react';
import Header from './index.jsx';
import '@testing-library/jest-dom';

test('renders without error', () => {
  render(<Header />);
});
