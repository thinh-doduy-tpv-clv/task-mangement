import { RESPONSE_MESSAGES } from './messages';

export const HttpStatusConstants = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  EXPECTATION_FAILED: 417,
  USER_ID_REQUIRED: 350,
  USER_NOT_EXISTED: 351,
};

export const HttpStatusMessages = {
  [HttpStatusConstants.OK]: 'OK',
  [HttpStatusConstants.CREATED]: 'Created',
  [HttpStatusConstants.BAD_REQUEST]: 'Bad Request',
  [HttpStatusConstants.UNAUTHORIZED]: 'Unauthorized',
  [HttpStatusConstants.FORBIDDEN]: 'Forbidden',
  [HttpStatusConstants.NOT_FOUND]: 'Not Found',
  [HttpStatusConstants.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
  [HttpStatusConstants.EXPECTATION_FAILED]: 'Expectation Failed',

  [HttpStatusConstants.USER_ID_REQUIRED]: RESPONSE_MESSAGES.USER_ID_REQUIRED,
  [HttpStatusConstants.USER_NOT_EXISTED]: RESPONSE_MESSAGES.USER_NOT_EXISTED,
};
