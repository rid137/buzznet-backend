const CustomError = require("./customError");

const BadRequest = (message = 'Bad request') =>
  new CustomError({ message, statusCode: 400, code: 'ERR_VALID' });

const Unauthorized = (message = 'Unauthorized') =>
  new CustomError({ message, statusCode: 401, code: 'ERR_AUTH' });

const Forbidden = (message = 'Forbidden') =>
  new CustomError({ message, statusCode: 403, code: 'ERR_FORBIDDEN' });

const NotFound = (message = 'Not found') =>
  new CustomError({ message, statusCode: 404, code: 'ERR_NF' });

const Conflict = (message = 'Conflict') =>
  new CustomError({ message, statusCode: 409, code: 'ERR_CONFLICT' });

const UnprocessableEntity = (message = 'Unprocessable entity') =>
  new CustomError({ message, statusCode: 422, code: 'ERR_UNPROCESSABLE' });

const InternalServerError = (message = 'Internal server error') =>
  new CustomError({ message, statusCode: 500, code: 'ERR_INTERNAL' });

module.exports = {
  BadRequest,
  Unauthorized,
  Forbidden,
  NotFound,
  Conflict,
  UnprocessableEntity,
  InternalServerError,
};