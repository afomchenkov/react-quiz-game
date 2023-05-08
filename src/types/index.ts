export enum Theme {
  Dark = 'dark',
  Light = 'light',
}

export type QuizQuestion = {
  answerSha1: string
  question: string
  questionHash: string
}

export type FetchQuestionsResponse<T> = {
  questions: T[]
}

export enum FetchQuestionStatus {
  Idle = 'idle',
  Loading = 'loading',
  Failed = 'failed'
}

export type User = {
  score: number
  chances: number
  answeredQuestions: Array<string>
  failedQuestions: Array<string>
}
