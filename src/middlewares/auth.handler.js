const boom = require('@hapi/boom');

exports.auth = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  } else {
    return next(boom.unauthorized());
  }
};
