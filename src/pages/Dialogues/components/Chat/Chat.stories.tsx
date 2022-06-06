import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Routes, Route } from 'react-router-dom';

import { Chat } from './Chat';
import { store } from 'src/store';

export default {
  title: 'pages/Dialogues/components/Chat',
  component: Chat,
} as ComponentMeta<typeof Chat>;

export const Default: ComponentStory<typeof Chat> = () => {
  return (
    <Provider store={store}>
      <MemoryRouter initialEntries={['/chats/default']} initialIndex={0}>
        <Routes>
          <Route path="/chats/:chatId" element={<Chat />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );
};
