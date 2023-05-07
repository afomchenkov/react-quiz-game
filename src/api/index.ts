import { QUESTIONS_URL } from '../constants';
import { QuizQuestion } from '../models';
import { debugLog, LogType } from '../utils';

export const request = async <TResponse>(
  url: string,
  config: RequestInit = {}
): Promise<TResponse> => {
  const response = await fetch(url, config)
  const data = await response.json();
  return data as TResponse;
}

export const api = {
  get: <TResponse>(url: string) =>
    request<TResponse>(url),
  post: <TBody extends BodyInit, TResponse>(url: string, body: TBody) =>
    request<TResponse>(url, { method: 'POST', body }),
}

export const fetchQuestions = async (): Promise<QuizQuestion[]> => {
  try {
    return api.get<QuizQuestion[]>(QUESTIONS_URL);
  } catch (error) {
    const { message } = error as Error
    debugLog(message, LogType.Error);
    return Promise.resolve([]);
  }
}
