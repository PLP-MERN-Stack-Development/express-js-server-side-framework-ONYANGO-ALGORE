class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode || 500;
    this.isOperational = true;
  }
}

class ValidationError extends AppError {
  constructor(message) {
    super(message, 400);
    this.name = 'ValidationError';
  }
}

class NotFoundError extends AppError {
  constructor(message) {
    super(message, 404);
    this.name = 'NotFoundError';
  }
}

class AuthError extends AppError {
  constructor(message) {
    super(message, 401);
    this.name = 'AuthError';
  }
}

const asyncHandler =
  (handler) =>
  (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };

module.exports = {
  AppError,
  ValidationError,
  NotFoundError,
  AuthError,
  asyncHandler
};

