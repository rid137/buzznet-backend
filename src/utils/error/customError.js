class CustomError {
  constructor({ message, statusCode, code }) {
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
  }
}
module.exports = CustomError;