import { Reducer } from 'redux';
import { DialoguesActions } from './types';
import {
  ADD_CHAT,
  ADD_MESSAGE,
  DELETE_CHAT,
} from 'src/store/dialogues/actions';
import { nanoid } from 'nanoid';

export interface Message {
  id: string;
  author: string;
  text: string;
}

export interface DialoguesState {
  [key: string]: Message[];
}

const initialState: DialoguesState = {
  default: [{ id: '1', author: 'Admin', text: 'Initialization...' }],
};

export const dialoguesReducer: Reducer<DialoguesState, DialoguesActions> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case ADD_CHAT: {
      return {
        ...state,
        [action.chatName]: [],
      };
    }
    case DELETE_CHAT: {
      const chats = { ...state };
      delete chats[action.chatId];
      return chats;
    }
    case ADD_MESSAGE: {
      return {
        ...state,
        [action.chatId]: [
          ...state[action.chatId],
          {
            id: nanoid(),
            author: action.message.author,
            text: action.message.text,
          },
        ],
      };
    }
    default:
      return state;
  }
};
