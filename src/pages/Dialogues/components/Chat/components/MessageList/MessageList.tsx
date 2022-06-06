import React, { FC } from 'react';
import { nanoid } from 'nanoid';

import { MessagePure, Message } from './components/Message/Message';

import styles from './MessageList.module.scss';

interface MessageListProps {
  messages: Message[];
}

export const MessageList: FC<MessageListProps> = (props) => {
  return (
    <div className={styles.message__list}>
      {props.messages.map((message) => (
        <MessagePure message={message} key={nanoid()} />
      ))}
    </div>
  );
};

export const MessageListPure = React.memo(MessageList);
