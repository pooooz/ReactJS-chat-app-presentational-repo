import React, { FC } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Sidebar } from './components/Sidebar/Sidebar';
import { Dialogue } from './pages/Dialogues/Dialogue';
import { ChatList } from './pages/Dialogues/components/ChatList/ChatList';
import { Profile } from 'src/pages/Profile/Profile';

export const AppRouter: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Sidebar />}>
          <Route path="profile" element={<Profile />} />
          <Route path="chats">
            <Route index element={<ChatList />} />
            <Route path=":chatId" element={<Dialogue />} />
          </Route>
        </Route>

        <Route path="*" element={<h2 style={{ color: '#00BFFF' }}>404</h2>} />
      </Routes>
    </BrowserRouter>
  );
};
