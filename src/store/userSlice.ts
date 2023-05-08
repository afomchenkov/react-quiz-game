import { createSlice } from '@reduxjs/toolkit';
import { User } from '../types';
import { RootState } from './index';

export type UserState = User;

// preload state from persistent storage after refreshing the page
const initialState: UserState = {
  score: 0,
  chances: 3,
  answeredQuestions: [],
  failedQuestions: []
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    increaseScore: (state) => {
      state.score += 1;
    },
    decreaseChances: (state) => {
      state.chances -= 1;
    },
    saveAnsweredQuestion: (state, action) => {
      const { questionHash } = action.payload;
      state.answeredQuestions.push(questionHash);
    },
    saveFailedQuestion: (state, action) => {
      const { questionHash } = action.payload;
      state.failedQuestions.push(questionHash);
    },
    flushScore: (state) => {
      state.score = 0;
      state.chances = 3;
      state.answeredQuestions = []
      state.failedQuestions = []
    }
  },
});

export const {
  increaseScore,
  decreaseChances,
  flushScore,
  saveAnsweredQuestion,
  saveFailedQuestion,
} = userSlice.actions;
export const getCurrentUser = (state: RootState) => state.user;
export default userSlice.reducer;