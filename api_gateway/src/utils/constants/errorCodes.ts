import { HttpStatusCodes } from './messages';

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
  [HttpStatusCodes.CREATED]: 'CREATED',
  [HttpStatusCodes.BAD_REQUEST]: 'BAD_REQUEST',
  [HttpStatusCodes.UNAUTHORIZED]: 'UNAUTHORIZED',
  [HttpStatusCodes.FORBIDDEN]: 'FORBIDDEN',
  [HttpStatusCodes.NOT_FOUND]: 'NOT FOUND',
  [HttpStatusCodes.INTERNAL_SERVER_ERROR]: 'INTERNAL SERVER ERROR',
  [HttpStatusCodes.EXPECTATION_FAILED]: 'EXPECTATION FAILED',

  [HttpStatusCodes.USER_ID_REQUIRED]: ERROR_MESSAGES.USER_ID_REQUIRED,
  [HttpStatusCodes.USER_NOT_EXISTED]: ERROR_MESSAGES.USER_NOT_EXISTED,
};
