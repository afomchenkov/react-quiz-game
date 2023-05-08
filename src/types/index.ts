export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

export type QuizQuestion = {
  answerSha1: string,
  question: string,
}

export type FetchQuestionsResponse<T> = {
  questions: T[],
}