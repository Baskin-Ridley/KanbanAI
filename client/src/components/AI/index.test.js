import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import AISteps from './index.jsx';

describe('AISteps', () => {
  test('renders without error', () => {
    render(<AISteps />);
  });

});
