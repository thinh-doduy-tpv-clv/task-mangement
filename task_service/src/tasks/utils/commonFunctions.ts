import { IData, ITask, ITaskReponse, ITasks } from '../types/task';

export function toFormatResponse(rawData?: ITask | ITasks) {
  if (rawData) {
    const respData: IData = {};
    if (
      typeof rawData === 'object' &&
      Array.isArray(rawData) &&
      rawData != null
    ) {
      respData.tasks = rawData as ITasks;
    } else {
      respData.task = rawData as ITask;
    }
    const response: ITaskReponse = {
      data: respData,
      error: { errorCode: 200, errorMsg: '' },
      isError: false,
    };
    return { ...response };
  }
  return {
    data: {},
    error: { errorCode: 204, errorMsg: '' },
    isError: true,
  } as ITaskReponse;
}

export const parseToTimeStamp = (inputDate: Date) => {
  // TODO: This function need updating more logic
  return new Date(inputDate);
};
