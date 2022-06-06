import React, { FC, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Sidebar } from './Sidebar/Sidebar';
import { Dialogue } from 'pages/Dialogues/Dialogue';
import { Profile } from 'pages/Profile/Profile';
import { ChatList } from 'pages/Dialogues/components/ChatList/ChatList';
import { SignIn } from 'pages/SignIn/SignIn';
import { SignUp } from 'pages/SignUp/SignUp';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter: FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Sidebar />}>
            <Route
              path="profile"
              element={<PrivateRoute component={<Profile />} />}
            />
            <Route path="chats" element={<PrivateRoute />}>
              <Route index element={<ChatList />} />
              <Route path=":chatId" element={<Dialogue />} />
            </Route>

            <Route
              path="signin"
              element={<PublicRoute component={<SignIn />} />}
            />
            <Route path="signup" element={<SignUp />} />
          </Route>
          <Route path="*" element={<h2 style={{ color: '#00BFFF' }}>404</h2>} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
