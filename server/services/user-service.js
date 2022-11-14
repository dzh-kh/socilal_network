const {
  TokenModel,
  UserModel,
  PostLikeModel,
  FriendshipModel,
  CommentLikeModel,
} = require("../models/index");
const bcrypt = require("bcrypt");
const tokenService = require("./token-service");
const ApiError = require("../exceptions/api-error");
const UserDto = require("../dtos/user-dto");

class UserService {
  async registration(email, password) {
    const candidate = await UserModel.findOne({ where: { email } });
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} already exists`);
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const user = await UserModel.create({
      email,
      password: hashPassword,
    });
    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async login(email, password) {
    const user = await UserModel.findOne({ where: { email } });

    if (!user) {
      throw ApiError.BadRequest(`User with email ${email} does not exist`);
    }
    const userDto = new UserDto(user);
    const isPassEquals = await bcrypt.compare(password, user.password);
    if (!isPassEquals) {
      throw ApiError.BadRequest(`Uncorrect password`);
    }
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnauthirizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);
    if (!userData || !tokenFromDb) {
      throw ApiError.UnauthirizedError();
    }
    const user = await UserModel.findOne({ where: { id: userData.id } });
    const userDto = new UserDto(user);
    const tokens = await tokenService.generateTokens({ ...userDto });
    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }
  async logout(refreshToken) {
    const token = await tokenService.removeToken(refreshToken);
    return token;
  }
  async getUserLikes(type, id, userId) {
    let userLikes = [];
    if (type === "post") {
      userLikes = await PostLikeModel.findAll({
        where: { userId, postId: id },
      });
    }
    if (type === "comment") {
      userLikes = await CommentLikeModel.findAll({
        where: { userId, commentId: id },
      });
    }
    return userLikes;
  }
}
module.exports = new UserService();
