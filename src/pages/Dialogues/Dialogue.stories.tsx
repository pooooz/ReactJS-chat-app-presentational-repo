import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import { Dialogue } from './Dialogue';
import { ChatList } from 'src/pages/Dialogues/components/ChatList/ChatList';
import { store } from 'src/store';

export default {
  title: 'pages/Dialogues/Dialogue',
  component: Dialogue,
} as ComponentMeta<typeof Dialogue>;

export const Default: ComponentStory<typeof Dialogue> = () => (
  <Provider store={store}>
    <MemoryRouter initialEntries={['/chats/']} initialIndex={0}>
      <Routes>
        <Route path="chats">
          <Route index element={<ChatList />} />
          <Route path=":chatId" element={<Dialogue />} />
        </Route>
      </Routes>
    </MemoryRouter>
  </Provider>
);
