import React, { FC } from 'react';

import styles from './Message.module.scss';

export interface Message {
  id: string;
  author: string;
  text: string;
}

interface MessageProps {
  message: Message;
}

export const Message: FC<MessageProps> = (props) => {
  return (
    <div className={styles.message}>
      <p className={styles.glitch} data-text={props.message.text}>
        {props.message.text}
      </p>
      <p
        className={styles.glitch}
        data-text={'Author: <' + props.message.author + '>'}
      >
        Author: &lt;{props.message.author}&gt;
      </p>
    </div>
  );
};

export const MessagePure = React.memo(Message);
