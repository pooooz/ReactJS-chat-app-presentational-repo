import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';

import { Profile } from './Profile';
import { store } from 'src/store';
import { defaultContext, ThemeContext } from 'src/utils/ThemeContext';

export default {
  title: 'pages/Profile/Profile',
  component: Profile,
} as ComponentMeta<typeof Profile>;

export const Default: ComponentStory<typeof Profile> = () => {
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
