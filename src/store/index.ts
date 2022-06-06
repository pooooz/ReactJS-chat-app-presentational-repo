import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';

import { profileReducer } from 'src/store/profile/slice';
import { dialoguesReducer } from 'src/store/dialogues/slice';

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['profile'],
};

export type StoreState = ReturnType<typeof rootReducer>;
const rootReducer = combineReducers({
  profile: profileReducer,
  dialogues: dialoguesReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
