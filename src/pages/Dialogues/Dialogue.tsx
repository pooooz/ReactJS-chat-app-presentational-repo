import React, { FC } from 'react';

import { Chat } from './components/Chat/Chat';
import { ChatList } from './components/ChatList/ChatList';

import styles from './Dialogue.module.scss';

export const Dialogue: FC = () => {
  return (
    <div className={styles.dialogue}>
      <Chat />
      <ChatList />
    </div>
  );
};
