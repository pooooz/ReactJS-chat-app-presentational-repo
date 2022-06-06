import React, { useState } from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import '@testing-library/jest-dom';
import '@testing-library/user-event';

import { Profile } from './Profile';
import { store } from 'src/store';
import { defaultContext, ThemeContext } from 'src/utils/ThemeContext';

describe('Profile', () => {
  it('Render component', () => {
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
  });

  it('Toggle profile theme', () => {
    const ProfileWitThemeContext = () => {
      const [theme, setTheme] = useState(defaultContext.theme);
      const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
      };
      return (
        <Provider store={store}>
          <ThemeContext.Provider value={{ theme, toggleTheme }}>
            <Profile />
          </ThemeContext.Provider>
        </Provider>
      );
    };
    render(<ProfileWitThemeContext />);
    fireEvent.click(screen.getAllByRole('button')[0]);
    expect(screen.getByText(/DARK/)).toBeInTheDocument();
  });

  it('Empty name value input', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
    fireEvent.input(screen.getByRole('textbox'), {
      target: { value: '' },
    });
    fireEvent.click(screen.getAllByRole('button')[2]);
    expect(asFragment()).toMatchSnapshot();
  });

  it('Change name', async () => {
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
    fireEvent.input(screen.getByRole('textbox'), {
      target: { value: 'My name' },
    });
    fireEvent.click(screen.getAllByRole('button')[2]);
    await waitFor(() =>
      expect(screen.getByText(/My name/)).toBeInTheDocument()
    );
  });

  it('Toggle profile visibility', () => {
    render(
      <Provider store={store}>
        <Profile />
      </Provider>
    );
    fireEvent.click(screen.getAllByRole('button')[1]);
    expect(screen.getByText(/No!/)).toBeInTheDocument();
  });
});
