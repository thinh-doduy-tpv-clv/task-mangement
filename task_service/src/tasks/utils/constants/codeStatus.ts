export const HttpStatusCodes = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  EXPECTATION_FAILED: 417,

  USER_ID_REQUIRED: 420,
  USER_ID_SHOULD_BE_POSITIVE: 422,
  USER_NOT_EXISTED: 423,

  TASK_ID_REQUIRED: 410,
  TASK_NOT_FOUND: 411,
  TASK_STATUS_INVALID: 412,
  TASK_ARCHIVED_CANNOT_BE_DELETED: 413,
  EXPECTION_FAILED: 414,
  ALL_FIELD_REQUIRED: 415,
};
