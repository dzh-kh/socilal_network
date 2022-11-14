const { TokenModel } = require("../models/index");
const jwt = require("jsonwebtoken");

class TokenService {
  async generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET_KEY, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(
      payload,
      process.env.REFRESH_TOKEN_SECRET_KEY,
      { expiresIn: "30d" }
    );

    return { accessToken, refreshToken };
  }
  async saveToken(userId, refreshToken) {
    const tokenData = await TokenModel.findOne({ where: { userId } });
    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      return tokenData.save();
    }
    const token = await TokenModel.create({ refreshToken, userId });
    return token;
  }
  validateRefreshToken(refreshToken) {
    try {
      const userData = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET_KEY
      );
      return userData;
    } catch (e) {
      return null;
    }
  }
  validateAccessToken(accessToken) {
    try {
      const userData = jwt.verify(
        accessToken,
        process.env.ACCESS_TOKEN_SECRET_KEY
      );
      return userData;
    } catch (e) {
      return null;
    }
  }
  async findToken(refreshToken) {
    const tokenData = await TokenModel.findOne({ where: { refreshToken } });
    return tokenData;
  }
  async removeToken(refreshToken) {
    const tokenData = await TokenModel.destroy({ where: { refreshToken } });
    return tokenData;
  }
}

module.exports = new TokenService();
