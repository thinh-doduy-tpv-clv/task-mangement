import { HttpStatusCodes } from "./codeStatus";

export const SUCCESS_MESSAGES = {
  // MESSAGES TASK
  GET_TASK_LIST_SUCCESS: 'Task list retrieved successfully',
  TASK_CREATED_SUCCESS: 'Task created successfully',
  TASK_UPDATED_SUCCESS: 'Task updated successfully',
  TASK_DELETED_SUCCESS: 'Task deleted successfully',
};

export const ERROR_MESSAGES = {
  TASK_ID_REQUIRED: 'Task ID is required',
  TASK_NOT_FOUND: 'Task not found',
  TASK_STATUS_INVALID: 'Invalid task status',
  TASK_ARCHIVED_CANNOT_BE_DELETED: 'Archived task cannot be deleted',

  // MESSAGES USER
  USER_ID_REQUIRED: 'User ID required',
  USER_NOT_EXISTED: 'User not found',

  // FAILED MESSAGES
  EXPECTION_FAILED: 'Expectation failed',
  ALL_FIELD_REQUIRED: 'Please provide all required fields',
};

export const HttpStatusMessages = {
  [HttpStatusCodes.OK]: 'OK',
  [HttpStatusCodes.CREATED]: 'Created',
  [HttpStatusCodes.BAD_REQUEST]: 'Bad Request',
  [HttpStatusCodes.UNAUTHORIZED]: 'Unauthorized',
  [HttpStatusCodes.FORBIDDEN]: 'Forbidden',
  [HttpStatusCodes.NOT_FOUND]: 'Not Found',
  [HttpStatusCodes.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
  [HttpStatusCodes.EXPECTATION_FAILED]: 'Expectation Failed',

  [HttpStatusCodes.USER_ID_REQUIRED]: ERROR_MESSAGES.USER_ID_REQUIRED,
  [HttpStatusCodes.USER_NOT_EXISTED]: ERROR_MESSAGES.USER_NOT_EXISTED,
};
