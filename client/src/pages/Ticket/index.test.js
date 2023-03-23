import React from 'react';
import { render } from '@testing-library/react';
import Ticket from './index.jsx';

test('renders without error', () => {
  render(<Ticket />);
});
