var createError = require("http-errors");

module.exports = {
  asyncMiddleware: fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(err => {
      const message = typeof err === "string" ? err : err.message;
      const error = !err.status
        ? new createError.InternalServerError(message)
        : err;
      next(error);
    });
  }
};
