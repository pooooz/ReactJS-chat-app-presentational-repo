import { PayloadAction, createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { update } from 'firebase/database';
import { refUserById } from 'src/services/firebase';

export interface ProfileState {
  auth: boolean;
  visible: boolean;
  name: string;
  id: string;
}

const initialState: ProfileState = {
  auth: false,
  visible: true,
  name: 'Anonymous',
  id: 'default',
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
    setName(state, action: PayloadAction<string>) {
      state.name = action.payload;
    },
    setUserId(state, action: PayloadAction<string>) {
      state.id = action.payload;
    },
  },
});

export const changeName = createAsyncThunk(
  'profile/changeName',
  async ({ userId, name }: { userId: string; name: string }) => {
    update(refUserById(userId), { name });
    setName(name);
  }
);

export const { changeAuth, toggleProfile, setName, setUserId } =
  profileSlice.actions;
export const profileReducer = profileSlice.reducer;
