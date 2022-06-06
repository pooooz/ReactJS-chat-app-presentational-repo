import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { nanoid } from 'nanoid';
import { Message, MessageState } from './types';

export interface DialoguesState {
  [key: string]: MessageState[];
}

const API_KEY = 'b366f632159215c2582b9678b75c731a';

const initialState: DialoguesState = {
  default: [{ id: '1', author: 'Admin', text: 'Initialization...' }],
};

const dialoguesSlice = createSlice({
  initialState,
  name: 'chats',
  reducers: {
    addChat(state, action: PayloadAction<{ name: string }>) {
      state[action.payload.name] = [];
    },
    deleteChat(state, action: PayloadAction<{ chatId: string }>) {
      delete state[action.payload.chatId];
    },
    addMessage(
      state,
      action: PayloadAction<{ chatId: string; message: Message }>
    ) {
      const { chatId } = action.payload;
      const { text, author } = action.payload.message;
      state[chatId].push({
        author,
        id: nanoid(),
        text,
      });
    },
  },
});

const fetchLocationTemperatureString = async (location: string) => {
  try {
    const coordinatesResponse = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${API_KEY}`
    );

    if (!coordinatesResponse.ok) {
      return 'Connection error';
    }

    const coordinatesText = await coordinatesResponse.json();
    if (coordinatesText.length) {
      const locationCoordinates = {
        lat: coordinatesText[0].lat,
        lon: coordinatesText[0].lon,
      };

      const weatherResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${locationCoordinates.lat}&lon=${locationCoordinates.lon}&appid=${API_KEY}`
      );
      if (weatherResponse.ok) {
        const weatherText = await weatherResponse.json();
        return `Recognized place: ${
          weatherText.name
        },\nTemperature in Celsius: ${(weatherText.main.temp - 273)
          .toFixed(3)
          .toString()}`;
      } else {
        return 'Unable to get temperature';
      }
    } else {
      return 'Wrong place name';
    }
  } catch (error) {
    return (error as Error).message;
  }
};

let timeout: NodeJS.Timeout;
export const addMessageWithReply = createAsyncThunk(
  'chats/addMessageWithReply',
  async (
    { chatId, message }: { chatId: string; message: Message },
    { dispatch }
  ) => {
    dispatch(addMessage({ chatId, message }));

    if (message.author !== 'BOT') {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(async () => {
        const temperatureCelsius = await fetchLocationTemperatureString(
          message.text
        );
        dispatch(
          addMessage({
            chatId,
            message: { author: 'You', text: temperatureCelsius },
          })
        );
      }, 1500);
    }
  }
);

export const { addChat, deleteChat, addMessage } = dialoguesSlice.actions;
export const dialoguesReducer = dialoguesSlice.reducer;
