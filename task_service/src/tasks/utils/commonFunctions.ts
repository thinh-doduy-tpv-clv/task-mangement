import { ITaskReponse } from '../types/task';

export function toFormatResponse(
  rawData?: any,
  message?: string,
  isError?: boolean,
) {
  return {
    data: rawData || undefined,
    message: message || '',
    error: isError ? { errorCode: 400, errorMsg: message } : null,
    isError: isError,
  } as ITaskReponse;
}

export const parseToTimeStamp = (inputDate: Date) => {
  // TODO: This function need updating more logic
  return new Date(inputDate);
};
