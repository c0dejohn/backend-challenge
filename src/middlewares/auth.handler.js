const boom = require('@hapi/boom');

exports.auth = (req, res, next) => {
  try {
    if (req.session && req.session.user) {
      return next();
    } else {
      return next(boom.unauthorized());
    }
  } catch (error) {
    next(error);
  }
};
