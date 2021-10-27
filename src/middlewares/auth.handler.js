const boom = require('@hapi/boom');

exports.checkAPIKey = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  if (!apiKey) {
    next(boom.unauthorized('Missing API key'));
  }

  if (apiKey !== process.env.API_KEY) {
    next(boom.unauthorized('Invalid API key'));
  }

  next();
};
