import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/user-event';
import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { Sidebar } from './Sidebar';
import { Provider } from 'react-redux';
import { store } from 'src/store';

describe('Sidebar', () => {
  it('Render component', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/chats']} initialIndex={0}>
          <Routes>
            <Route path="/chats/" element={<Sidebar />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(asFragment()).toMatchSnapshot();
  });
});
