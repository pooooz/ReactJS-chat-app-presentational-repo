import { StoreState } from '../index';

export const selectAuth = (state: StoreState) => state.profile.auth;

export const selectVisible = (state: StoreState) => state.profile.visible;

export const selectName = (state: StoreState) => state.profile.name;
