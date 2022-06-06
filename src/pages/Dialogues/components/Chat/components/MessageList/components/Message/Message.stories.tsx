import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Message } from './Message';

export default {
  title: 'pages/Dialogues/components/Message',
  component: Message,
} as ComponentMeta<typeof Message>;

const message = { id: '1', author: 'Admin', text: 'Initialization...' };
export const Default: ComponentStory<typeof Message> = () => (
  <Message message={message} />
);
