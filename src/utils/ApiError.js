const httpStatus = require('http-status');

/**
 * A custom error that can be thrown from basically anywhere
 * if you are unsure of what to throw, just use the internalServerError method
 *
 */
class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }

  /**
   * Resource not found error
   *
   * @returns {ApiError}
   */
  static resourceNotFound() {
    return new ApiError(httpStatus.NOT_FOUND, 'Resource not found');
  }

  /**
   * Unauthorized action
   *
   * @returns {ApiError}
   */
  static forbidden() {
    return new ApiError(httpStatus.FORBIDDEN, 'This action is unauthorized');
  }

  /**
   * Internal server error
   *
   * @returns {ApiError}
   */
  static internalServerError() {
    return new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'Internal server error');
  }
}

module.exports = ApiError;
