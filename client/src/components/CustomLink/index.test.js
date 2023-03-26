import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CustomLink from './index.jsx';
import '@testing-library/jest-dom';


describe('CustomLink', () => {
  test('renders without error', () => {
    render(
      <MemoryRouter>
        <CustomLink to="/" className="test-link">
          Home
        </CustomLink>
      </MemoryRouter>
    );
  });
});
