import React from 'react';
import { render } from '@testing-library/react';
import Home from './index.jsx';

test('renders without error', () => {
  render(<Home />);
});
