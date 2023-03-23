import React from 'react';
import { render } from '@testing-library/react';
import Footer from './index.jsx';
import '@testing-library/jest-dom';


describe('Footer component', () => {
  test('renders without errors', () => {
    render(<Footer />);
  });
});
