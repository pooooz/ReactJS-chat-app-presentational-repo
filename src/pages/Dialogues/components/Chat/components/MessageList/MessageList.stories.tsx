import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MessageList } from 'src/pages/Dialogues/components/Chat/components/MessageList/MessageList';
import { WithClasses } from 'src/HOC/WithClasses';
import styles from '../../Chat.module.scss';

export default {
  title: 'pages/Dialogues/components/MessageList',
  component: MessageList,
} as ComponentMeta<typeof MessageList>;

const messages = [
  { id: '1', author: 'Admin', text: 'Initialization...' },
  { id: '2', author: 'You', text: 'Hello!!!' },
];

export const Default: ComponentStory<typeof MessageList> = (args) => (
  <MessageList messages={args.messages} />
);
Default.args = {
  messages,
};

const MessageListWithClasses = WithClasses(MessageList);
export const Bordered: ComponentStory<typeof MessageList> = (args) => (
  <MessageListWithClasses {...args} classes={styles.border} />
);
Bordered.args = {
  messages,
};
