import { IError, ITask, ITaskReponse } from '../types/task';
import {
  HttpStatusConstants,
  HttpStatusMessages,
} from './constants/statusCode';

export function toFormatResponse(
  rawData?: ITask[],
  error?: IError,
  message?: string,
  isError?: boolean,
) {
  if (rawData) {
    const response: ITaskReponse = {
      data: rawData,
      error: error && isError ? error : null,
      isError: isError,
      message: message || '',
    };
    return response;
  }
  return {
    data: [],
    error: error || { errorCode: 204, errorMsg: '' },
    isError: true,
  } as ITaskReponse;
}
