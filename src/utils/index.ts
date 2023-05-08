const IS_LOGGING_ENABLED = true;

export enum LogType {
  Warning = 'warning',
  Error = 'error',
  Log = 'log',
}

export type DebugLog = (message: string, logType: LogType) => void

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