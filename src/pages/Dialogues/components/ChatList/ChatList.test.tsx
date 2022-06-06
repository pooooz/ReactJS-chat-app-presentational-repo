import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/user-event';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { store } from 'src/store';
import { ChatList } from './ChatList';

describe('ChatList test', () => {
  it('Render component', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router location="/chats" navigator={history}>
          <ChatList />
        </Router>
      </Provider>
    );
  });

  it('Adding a chat', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router location="/chats" navigator={history}>
          <ChatList />
        </Router>
      </Provider>
    );
    fireEvent.input(screen.getByRole('textbox'), {
      target: { value: 'initial' },
    });
    fireEvent.click(screen.getAllByRole('button', { name: /Add chat/ })[0]);
    expect(screen.getByText(/initial/)).toBeInTheDocument();
  });

  it('Deleting a chat', () => {
    const history = createMemoryHistory();
    render(
      <Provider store={store}>
        <Router location="/chats" navigator={history}>
          <ChatList />
        </Router>
      </Provider>
    );
    fireEvent.click(screen.getAllByRole('button', { name: /X/ })[0]);
    expect(() => screen.getByText(/default/)).toThrow();
  });

  it('Adding an empty chat', () => {
    const history = createMemoryHistory();
    const { asFragment } = render(
      <Provider store={store}>
        <Router location="/chats" navigator={history}>
          <ChatList />
        </Router>
      </Provider>
    );
    fireEvent.input(screen.getByRole('textbox'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Add chat/ }));
    expect(asFragment()).toMatchSnapshot();
  });
});
