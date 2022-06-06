import React from 'react';
import '@testing-library/jest-dom';
import '@testing-library/user-event';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  const history = createMemoryHistory();
  it('Render component', () => {
    const { asFragment } = render(
      <Router location="/" navigator={history}>
        <Sidebar />
      </Router>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
