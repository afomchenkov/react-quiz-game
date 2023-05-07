import { sha1 } from 'crypto-hash';

const IS_LOGGING_ENABLED = true;

export enum LogType {
  Warning = 'warning',
  Error = 'error',
  Log = 'log',
}

export type DebugLog = (message: string, logType: LogType) => void

/**
 * Logs the message
 *
 * @param message
 * @param logType 
 * @returns 
 */
export const debugLog: DebugLog = (message = '', logType = LogType.Log) => {
  if (!message || !IS_LOGGING_ENABLED) {
    return;
  }

  switch (logType) {
    case LogType.Error:
      console.error('Error: ', message);
      break;
    case LogType.Warning:
      console.warn('Warning: ', message);
      break;
    case LogType.Log:
      console.log('Log: ', message);
      break;
    default:
      console.error('Undefined: ', message);
  }
}

/**
 * Generates SHA1 hash to verify the answer
 *
 * @param text
 * @returns 
 */
export const generateSHA1Hash = (text: string): Promise<string> => sha1(text);

/**
 * Generates hash code to persist the questions as SHA1 is async and expensice to run
 *
 * @param text
 * @returns 
 */
export const generateStrHash = (text: string): string => {
  let hash = 0;

  if (text.length === 0) {
    return String(hash);
  }

  for (let i = 0; i < text.length; i++) {
    const chr = text.charCodeAt(i);
    hash = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }

  return String(hash);
}

export const capitalise = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

export const hasUserAnsweredQuestion = (userAnsweredQuestions: string[] = [], questionHash: string): boolean => {
  return userAnsweredQuestions.includes(questionHash);
}
