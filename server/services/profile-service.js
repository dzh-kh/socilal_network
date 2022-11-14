const ApiError = require("../exceptions/api-error");
const { ProfileModel, FriendshipModel, UserModel } = require("../models");
const { addFile, removeFile, getValidValues } = require("../utils/functions");
const { Op } = require("sequelize");
class ProfileService {
  async createProfile(userId, firstName, lastName) {
    const profile = await ProfileModel.create({ userId, firstName, lastName });
    return profile;
  }

  async editProfile(id, avatar, background, bio, gender, lastName, firstName) {
    const values = getValidValues({
      avatar,
      background,
      bio,
      gender,
      lastName,
      firstName,
    });

    const prevProfile = await ProfileModel.findOne({
      where: { id },
    });

    if (avatar && prevProfile?.avatar) {
      await removeFile(prevProfile?.avatar);
      values.avatar = await addFile(avatar);
    }
    if (avatar && !prevProfile?.avatar) {
      values.avatar = await addFile(avatar);
    }
    if (avatar === null && !prevProfile?.avatar) {
      values.avatar = null;
    }
    if (avatar === null && prevProfile?.avatar) {
      await removeFile(prevProfile?.avatar);
      values.avatar = null;
    }

    if (background && prevProfile?.background) {
      await removeFile(prevProfile?.background);
      values.background = await addFile(background);
    }
    if (background && !prevProfile?.background) {
      values.background = await addFile(background);
    }
    if (background === null && !prevProfile?.background) {
      values.background = null;
    }
    if (background === null && prevProfile?.background) {
      await removeFile(prevProfile?.background);
      values.background = null;
    }

    const profile = await ProfileModel.update(values, {
      where: { id },
      returning: true,
      plain: true,
    });
    return profile;
  }

  async getProfile(id) {
    const profile = await ProfileModel.findOne({
      where: { id },
    });
    return profile;
  }

  async getProfiles(query) {
    query = query.split(" ");
    const profile = await ProfileModel.findAll({
      limit: 6,
      attributes: ["firstName", "lastName", "avatar", "id"],
      where: {
        [Op.or]: [
          {
            firstName: { [Op.like]: { [Op.any]: query } },
          },
          {
            firstName: { [Op.startsWith]: query[1] },
          },
          {
            firstName: { [Op.startsWith]: query[0] },
          },
          {
            lastName: { [Op.like]: { [Op.any]: query } },
          },
          {
            lastName: { [Op.startsWith]: query[1] },
          },
          {
            lastName: { [Op.startsWith]: query[0] },
          },
        ],
      },
    });
    return profile;
  }

  async addFriend(requesterId, adresseeId) {
    adresseeId = +adresseeId;
    const friendship = await FriendshipModel.create({
      requesterId,
      adresseeId,
    });
    return friendship;
  }

  async accessFriendship(requesterId, adresseeId) {
    const friendship = await FriendshipModel.findOne({
      where: { requesterId, adresseeId },
    });
    if (friendship) {
      const friendship = await FriendshipModel.update(
        { accepted: true },
        { where: { requesterId, adresseeId }, plain: true }
      );
      return friendship;
    }
    throw ApiError.BadRequest("Friendship dons not exist");
  }

  async removeFriend(friendId, userId) {
    const friendship = await FriendshipModel.destroy({
      where: {
        requesterId: { [Op.or]: [friendId, userId] },
        adresseeId: { [Op.or]: [friendId, userId] },
      },
    });
    return friendship;
  }

  async getFriends(id) {
    const friends = await ProfileModel.findOne({
      where: { id },
      attributes: [],
      include: [
        {
          model: ProfileModel,
          as: "adressees",
          attributes: ["firstName", "lastName", "avatar", "id"],
        },
        {
          model: ProfileModel,
          as: "requesters",
          attributes: ["firstName", "lastName", "avatar", "id"],
          include: {
            model: FriendshipModel,
            where: {
              [Op.or]: [
                { adresseeId: id },
                { [Op.and]: [{ requesterId: id }, { accepted: true }] },
              ],
            },
          },
        },
      ],
    });
    const friendsList = [...friends.requesters, ...friends.adressees];
    return friendsList;
  }
}

module.exports = new ProfileService();
