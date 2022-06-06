import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import '@testing-library/jest-dom';
import '@testing-library/user-event';

import { Chat } from './Chat';
import { store } from 'src/store';

describe('Chat', () => {
  it('Render component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/chats/default']} initialIndex={0}>
          <Routes>
            <Route path="/chats/:chatId" element={<Chat />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });

  it('Render with snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/chats/default']} initialIndex={0}>
          <Routes>
            <Route path="/chats/:chatId" element={<Chat />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('Empty message sending', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/chats/default']} initialIndex={0}>
          <Routes>
            <Route path="/chats/:chatId" element={<Chat />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    fireEvent.input(screen.getByRole('textbox'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByRole('button'));
    expect(asFragment()).toMatchSnapshot();
  });

  it('Filled message sending', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/chats/default']} initialIndex={0}>
          <Routes>
            <Route path="/chats/:chatId" element={<Chat />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
    fireEvent.input(screen.getByRole('textbox'), {
      target: { value: 'Test' },
    });
    fireEvent.click(screen.getByRole('button'));
    expect(screen.getByText(/Test/)).toBeInTheDocument();
  });

  it('Wrong route test', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/chats/defaults']} initialIndex={0}>
          <Routes>
            <Route path="/chats/:chatId" element={<Chat />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });
});
