const { AuthError } = require('../utils/errors');

const authenticationMiddleware = (req, res, next) => {
  const expectedKey = process.env.API_KEY || 'dev-api-key';
  const apiKey = req.header('x-api-key');

  if (!apiKey) {
    return next(new AuthError('Missing API key in request headers'));
  }

  if (apiKey !== expectedKey) {
    return next(new AuthError('Invalid API key'));
  }

  return next();
};

module.exports = authenticationMiddleware;

