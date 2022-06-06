import React, { FC, useState } from 'react';
import { defaultContext, ThemeContext } from 'src/utils/ThemeContext';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { AppRouter } from 'src/AppRouter';
import { store, persistor } from 'src/store';

export const App: FC = () => {
  const [theme, setTheme] = useState(defaultContext.theme);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <Provider store={store}>
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        <PersistGate persistor={persistor}>
          <AppRouter />
        </PersistGate>
      </ThemeContext.Provider>
    </Provider>
  );
};
