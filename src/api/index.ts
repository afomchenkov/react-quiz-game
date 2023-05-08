import { QUESTIONS_URL } from '../constants';
import { FetchQuestionsResponse, QuizQuestion } from '../types';
import { debugLog, LogType } from '../utils';

export const request = async <TResponse>(
  url: string,
  customConfig: RequestInit = {},
  body?: Record<string, unknown>
): Promise<TResponse> => {
  const headers = { 'Content-Type': 'application/json' }

  const config = {
    method: body ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await window.fetch(url, config);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const data = await response.json();
  return data as TResponse;
}

export const api = {
  get: <TResponse>(url: string) =>
    request<TResponse>(url),
  post: <TBody extends BodyInit, TResponse>(url: string, body: TBody) =>
    request<TResponse>(url, { method: 'POST', body }),
}

export const fetchQuestions = async (): Promise<FetchQuestionsResponse<QuizQuestion>> => {
  try {
    return api.get<FetchQuestionsResponse<QuizQuestion>>(QUESTIONS_URL);
  } catch (error) {
    const { message } = error as Error
    debugLog(message, LogType.Error);
    return Promise.resolve({
      questions: []
    });
  }
}
