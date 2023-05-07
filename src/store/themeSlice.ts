import { createSlice } from '@reduxjs/toolkit';
import { Theme } from '../types';
import { RootState } from './index';

export type ThemeState = {
  selectedTheme: Theme;
}

const initialState: ThemeState = {
  selectedTheme: Theme.Light,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setDark: (state) => {
      state.selectedTheme = Theme.Dark;
    },
    setLight: (state) => {
      state.selectedTheme = Theme.Light;
    },
  },
});

export const { setDark, setLight } = themeSlice.actions;
export const getCurrentTheme = (state: RootState) => state.theme.selectedTheme;
export default themeSlice.reducer;
