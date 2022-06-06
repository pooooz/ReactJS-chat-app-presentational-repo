import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { ChatList } from './ChatList';
import { store } from 'src/store';

export default {
  title: 'pages/Dialogues/components/ChatList',
  component: ChatList,
} as ComponentMeta<typeof ChatList>;

export const Default: ComponentStory<typeof ChatList> = () => (
  <Provider store={store}>
    <MemoryRouter>
      <ChatList />
    </MemoryRouter>
  </Provider>
);
