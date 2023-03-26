import React from 'react';
import { render } from '@testing-library/react';
import Settings from './index.jsx';
import '@testing-library/jest-dom';

test('renders without error', () => {
  render(<Settings />);
});
