const { ValidationError } = require('sequelize');

exports.logErrors = (err, req, res, next) => {
  next(err);
};

exports.errorHandler = (err, req, res) => {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};

exports.boomErrorHandler = (err, req, res, next) => {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  }
  next(err);
};

exports.ormErrorHandler = (err, req, res, next) => {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  }
  next(err);
};
