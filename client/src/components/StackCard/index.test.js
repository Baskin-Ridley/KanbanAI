import React from 'react';
import { render, screen, act } from '@testing-library/react';
import StackCard from './index.jsx';
import '@testing-library/jest-dom';

const mockFetchPromise = Promise.resolve({
    json: () => Promise.resolve({ items: [] }),
});
global.fetch = jest.fn().mockImplementation(() => mockFetchPromise);

test('renders without errors', async () => {
    const useStateMock = jest.spyOn(React, 'useState');
    const useEffectMock = jest.spyOn(React, 'useEffect');

    const setStack = jest.fn();
    const setTitle = jest.fn();
    const setTag = jest.fn();
    const setStates = jest.fn();
    const setTitleView = jest.fn();
    const setLatest = jest.fn();

    useStateMock.mockReturnValueOnce([undefined, setStack]);
    useStateMock.mockReturnValueOnce(['', setTitle]);
    useStateMock.mockReturnValueOnce(['', setTag]);
    useStateMock.mockReturnValueOnce([false, setStates]);
    useStateMock.mockReturnValueOnce([true, setTitleView]);
    useStateMock.mockReturnValueOnce(['question', setLatest]);

    await act(async () => {
        render(<StackCard />);
    });

});
