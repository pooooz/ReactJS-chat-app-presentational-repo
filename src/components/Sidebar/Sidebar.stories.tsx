import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Sidebar } from './Sidebar';
import { MemoryRouter } from 'react-router-dom';

export default {
  title: 'components/Sidebar',
  component: Sidebar,
} as ComponentMeta<typeof Sidebar>;

export const Default: ComponentStory<typeof Sidebar> = () => (
  <MemoryRouter>
    <Sidebar />
  </MemoryRouter>
);
