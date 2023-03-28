import React from 'react';
import { render } from '@testing-library/react';
import Home from './index.jsx';
import '@testing-library/jest-dom';

test('renders without error', () => {
  render(<Home />);
});
