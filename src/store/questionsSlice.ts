import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './index';
import { QuizQuestion, FetchQuestionStatus } from '../types';
import { fetchQuestions } from '../api';
import { generateStrHash } from '../utils';

export interface QuestionsState {
  remainingQuestions: QuizQuestion[]
  status: FetchQuestionStatus
}

const initialState: QuestionsState = {
  remainingQuestions: [],
  status: FetchQuestionStatus.Idle,
};

export const loadQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async () => {
    const response = await fetchQuestions();
    return response.questions;
  }
);

export const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    setQuestions: (state, action: PayloadAction<QuizQuestion[]>) => {
      const loadedQuestions = action.payload;
      state.remainingQuestions = loadedQuestions;
    },
    removeQuestion: (state, action) => {
      const questionHashToRemove = action.payload;
      state.remainingQuestions = state.remainingQuestions.filter(item => {
        return item.questionHash !== questionHashToRemove;
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadQuestions.pending, (state) => {
        state.status = FetchQuestionStatus.Loading;
      })
      .addCase(loadQuestions.fulfilled, (state, action) => {
        state.status = FetchQuestionStatus.Idle;
        const loadedQuestions = action.payload;
        state.remainingQuestions = loadedQuestions.map(item => {
          const { question, answerSha1 } = item;
          return {
            question,
            answerSha1,
            questionHash: generateStrHash(question),
          }
        });;
      })
      .addCase(loadQuestions.rejected, (state) => {
        state.status = FetchQuestionStatus.Failed;
      });
  },
});

export const { setQuestions, removeQuestion } = questionsSlice.actions;
export const selectQuestions = (state: RootState) => state.questions;
export default questionsSlice.reducer;