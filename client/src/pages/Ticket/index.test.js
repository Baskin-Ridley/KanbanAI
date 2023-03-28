import React from 'react';
import { render } from '@testing-library/react';
import Ticket from './index.jsx';
import '@testing-library/jest-dom';

test('renders without error', () => {
  render(<Ticket />);
});
