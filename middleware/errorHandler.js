const { NotFoundError } = require('../utils/errors');

const notFoundHandler = (req, res, next) => {
  next(new NotFoundError(`Route ${req.method} ${req.originalUrl} not found`));
};

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;

  if (!err.isOperational) {
    console.error('Unexpected error:', err);
  }

  res.status(statusCode).json({
    error: err.name || 'InternalServerError',
    message: err.message || 'Something went wrong'
  });
};

module.exports = {
  notFoundHandler,
  errorHandler
};

