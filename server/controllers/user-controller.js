const res = require("express/lib/response");
const userService = require("../services/user-service");
const profileService = require("../services/profile-service");

class UserController {
  async registration(req, res, next) {
    try {
      const { firstName, lastName, email, password } = req.body;
      const userData = await userService.registration(email, password);
      await profileService.createProfile(userData.user.id, firstName, lastName);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(201).json(userData);
    } catch (e) {
      next(e);
    }
  }
  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userService.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(201).json(userData);
    } catch (e) {
      next(e);
    }
  }
  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: true,
      });
      return res.status(200).json(userData);
    } catch (e) {
      next(e);
    }
  }
  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (e) {
      next(e);
    }
  }
  async getUserLikes(req, res, next) {
    try {
      const postId = req.query?.postId;
      const commentId = req.query?.commentId;
      let id = postId ? postId : commentId;
      let type = postId ? "post" : "comment";
      const userId = req.user.id;
      const userLikes = await userService.getUserLikes(type, id, userId);
      return res.json(userLikes);
    } catch (e) {
      next(e);
    }
  }
}
module.exports = new UserController();
