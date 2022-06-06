import { AddChat, AddMessage, DeleteChat, Message } from './types';
import { Dispatch } from 'redux';

const API_KEY = 'b366f632159215c2582b9678b75c731a';

export const ADD_CHAT = 'DIALOGUES::ADD_CHAT';
export const addChat: AddChat = (chatName) => ({
  type: ADD_CHAT,
  chatName,
});

export const DELETE_CHAT = 'DIALOGUES::DELETE_CHAT';
export const deleteChat: DeleteChat = (chatId) => ({
  type: DELETE_CHAT,
  chatId,
});

export const ADD_MESSAGE = 'DIALOGUES::ADD_MESSAGE';
export const addMessage: AddMessage = (chatId, message) => ({
  type: ADD_MESSAGE,
  chatId,
  message,
});

const fetchLocationTemperature = async (location: string) => {
  const coordinatesResponse = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${location}&appid=${API_KEY}`
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
};

let timeout: NodeJS.Timeout;
export const addMessageWithReply =
  (chatId: string, message: Message) =>
  (dispatch: Dispatch<ReturnType<AddMessage>>) => {
    dispatch(addMessage(chatId, message));

    if (message.author !== 'BOT') {
      if (timeout) {
        clearTimeout(timeout);
      }

      timeout = setTimeout(async () => {
        const temperatureCelsius = await fetchLocationTemperature(message.text);
        dispatch(
          addMessage(chatId, {
            text: temperatureCelsius,
            author: 'BOT',
          })
        );
      }, 1500);
    }
  };
