const ApiError = require("../exceptions/api-error");
const tokenService = require("../services/token-service");

const authMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      next(ApiError.UnauthirizedError());
    }
    const accessToken = authorizationHeader.split(" ")[1];
    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      next(ApiError.UnauthirizedError());
    }
    req.user = userData;
    next();
  } catch (e) {
    next(ApiError.UnauthirizedError());
  }
};
module.exports = authMiddleware;
