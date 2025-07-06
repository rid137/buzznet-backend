const CustomError = require('../utils/error/customError');
const { getErrorMessage } = require('../utils/error/getErrorMessage');
const { 
    BadRequest,
    Conflict,
    Unauthorized
} = require('../utils/error/httpErrors');

function errorHandler(error, req, res, next) {
  if (res.headersSent) return next(error);

  if (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    typeof error.name === 'string'
  ) {
    switch (error.name) {
      case 'SequelizeValidationError': {
        const messages = error.errors?.map((err) => err.message) || [];
        error = BadRequest(messages.join('; ') || 'Validation failed');
        break;
      }

      case 'SequelizeUniqueConstraintError': {
        const message = error.errors?.[0]?.message || 'Unique constraint failed';
        error = Conflict(message);
        break;
      }

      case 'SequelizeDatabaseError': {
        const msg = error.message.toLowerCase();

        if (msg.includes('invalid input value for enum')) {
          error = BadRequest('Invalid value provided for one of the enum fields.');
        } else if (msg.includes('invalid input syntax for integer')) {
          error = BadRequest('Expected a numeric value but received something else.');
        } else if (msg.includes('column') && msg.includes('does not exist')) {
          error = BadRequest('Invalid column used in the query.');
        } else {
          error = BadRequest('A database error occurred.');
        }

        break;
      }

      case 'SequelizeForeignKeyConstraintError':
        error = BadRequest('Foreign key constraint failed.');
        break;

      case 'JsonWebTokenError':
        error = Unauthorized('Invalid token.');
        break;

      case 'TokenExpiredError':
        error = Unauthorized('Token expired.');
        break;

      case 'NotBeforeError':
        error = Unauthorized('Token not active yet.');
        break;

      default:
        break;
    }
  }

  if (error instanceof CustomError) {
    return res.status(error.statusCode).json({
      error: {
        message: error.message,
        statusCode: error.statusCode,
        code: error.code,
      },
    });
  }

  if (process.env.NODE_ENV === 'development') {
    console.error('Unhandled Error:', error);
  }

  res.status(500).json({
    error: {
      message:
        getErrorMessage(error) ||
        'An error occurred. Please view logs for more details.',
    },
  });
}

module.exports = errorHandler;