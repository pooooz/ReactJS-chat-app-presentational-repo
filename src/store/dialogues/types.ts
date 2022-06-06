import { ADD_CHAT, DELETE_CHAT, ADD_MESSAGE } from './actions';

export type DialoguesActions =
  | ReturnType<AddChat>
  | ReturnType<DeleteChat>
  | ReturnType<AddMessage>;

export type Message = {
  text: string;
  author: string;
};

export type AddChat = (chatName: string) => {
  type: typeof ADD_CHAT;
  chatName: string;
};

export type DeleteChat = (chatId: string) => {
  type: typeof DELETE_CHAT;
  chatId: string;
};

export type AddMessage = (
  chatId: string,
  message: Message
) => {
  type: typeof ADD_MESSAGE;
  chatId: string;
  message: Message;
};
