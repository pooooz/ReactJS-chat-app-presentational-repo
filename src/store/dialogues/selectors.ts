import { nanoid } from 'nanoid';
import { StoreState } from '../index';

export const selectChatList = (state: StoreState) =>
  Object.keys(state.dialogues).map((chat) => ({
    id: nanoid(),
    name: chat,
  }));

export const selectChats = (state: StoreState) => state.dialogues;
