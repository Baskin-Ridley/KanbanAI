import React from 'react';
import { render, screen } from '@testing-library/react';
import { UserContext } from '../../context/UserContext';
import NotFoundPage from './index.jsx';

describe('NotFoundPage', () => {
    test('displays link to home page', () => {
        const user = { username: 'mockedUser' };
        <UserContext.Provider value={{ user }}>
            render(<NotFoundPage />);
        </UserContext.Provider>
    });
});
