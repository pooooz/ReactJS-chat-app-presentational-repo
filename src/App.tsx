import React, { FC, useState } from 'react';
import { defaultContext, ThemeContext } from 'src/utils/ThemeContext';
import { Provider } from 'react-redux';

import { AppRouter } from './components/AppRouter';
import { store } from 'src/store';

export const App: FC = () => {
  const [theme, setTheme] = useState(defaultContext.theme);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <AppRouter />
      </ThemeContext.Provider>
    </Provider>
  );
};
