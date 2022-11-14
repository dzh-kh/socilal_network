const profileService = require("../services/profile-service");

class ProfileController {
  async editProfile(req, res, next) {
    try {
      const { bio, gender, lastName, firstName } = req.body;

      const avatar = req.files?.avatar
        ? req.files.avatar
        : req.body?.avatar
        ? null
        : undefined;
      const background = req.files?.background
        ? req.files.background
        : req.body?.background
        ? null
        : undefined;
      const { id } = req.params;
      const profile = await profileService.editProfile(
        id,
        avatar,
        background,
        bio,
        gender,
        lastName,
        firstName
      );
      res.status(201).json(profile);
    } catch (e) {
      next(e);
    }
  }

  async getProfile(req, res, next) {
    try {
      const { id } = req.params;
      const profile = await profileService.getProfile(id);
      res.json(profile);
    } catch (e) {
      next(e);
    }
  }

  async getProfiles(req, res, next) {
    try {
      const { query } = req.query;
      const profile = await profileService.getProfiles(query);
      res.json(profile);
    } catch (e) {
      next(e);
    }
  }

  async addFriend(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const profile = await profileService.addFriend(userId, id);
      res.status(201).json(profile);
    } catch (e) {
      next(e);
    }
  }
  async accessFriendship(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const profile = await profileService.accessFriendship(id, userId);
      res.json(profile);
    } catch (e) {
      next(e);
    }
  }
  async removeFriend(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const profile = await profileService.removeFriend(id, userId);
      res.json(profile);
    } catch (e) {
      next(e);
    }
  }

  async getFriends(req, res, next) {
    try {
      const { id } = req.params;

      const friends = await profileService.getFriends(id);
      res.json(friends);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new ProfileController();
