import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface ProfileState {
  auth: boolean;
  visible: boolean;
  name: string;
}

const initialState: ProfileState = {
  auth: false,
  visible: true,
  name: 'Anonymous',
};

const profileSlice = createSlice({
  initialState,
  name: 'profile',
  reducers: {
    changeAuth: (state, action: PayloadAction<boolean>) => {
      state.auth = action.payload;
    },
    toggleProfile(state) {
      state.visible = !state.visible;
    },
    changeName(state, action: PayloadAction<{ name: string }>) {
      state.name = action.payload.name;
    },
  },
});

export const { changeAuth, toggleProfile, changeName } = profileSlice.actions;
export const profileReducer = profileSlice.reducer;
