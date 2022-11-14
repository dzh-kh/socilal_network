const { validationResult } = require("express-validator");
const ApiError = require("../exceptions/api-error");

const validateRequestMiddleware = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const err = errors.array();
    next(
      ApiError.BadRequest(err[0]["msg"] || "validation error", errors.array())
    );
  }
  next();
};

module.exports = validateRequestMiddleware;
