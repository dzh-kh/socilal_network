const {
  PostModel,
  PostLikeModel,
  TagModel,
  PostTagModel,
  UserModel,
  CommentModel,
  ProfileModel,
} = require("../models/index.js");
const ApiError = require("../exceptions/api-error");
const { Op } = require("sequelize");
const sequelize = require("../db/db");
const { addFile, removeFile, getValidValues } = require("../utils/functions");

class PostService {
  async createPost(selectedFile, title, message, tags, userId) {
    tags = tags.split(",");
    const fileName = selectedFile ? await addFile(selectedFile) : null;
    const post = await PostModel.create({
      title,
      message,
      selectedFile: fileName,
      userId,
    });
    tags.map(async (name) => {
      const tag = await TagModel.findOrCreate({
        where: { name },
        defaults: { name },
      });
      await PostTagModel.create({ postId: post.id, tagId: tag[0].id });
    });
    const newPost = await PostModel.findOne({
      where: { id: post.id },
      raw: true,
      nest: true,
      include: [
        {
          model: ProfileModel,
          as: "author",
          attributes: ["id", "lastName", "firstName", "avatar"],
        },
      ],
    });

    return {
      ...newPost,
      comments: [],
      likedBy: [],
      tags: tags.map((tag, i) => {
        return { name: tag, id: i };
      }),
    };
  }

  async getPosts(title, tags, sortBy, userId, offset, limit) {
    const values = getValidValues({ title, userId });
    console;
    let order = null;
    limit = limit === "undefined" ? 10 : limit;
    if (sortBy) {
      order = sortBy.split("_");
      order =
        order[0] === "createdAt"
          ? order
          : order[0] === "popularity"
          ? [{ model: UserModel, as: "likedBy" }, "id", order[1]]
          : null;
    }
    let tagPosts = [];
    if (tags?.length) {
      tags = tags.split(",");
      let tagList = await TagModel.findAll({
        where: { name: { [Op.or]: tags } },
        attributes: ["id"],
        raw: true,
      });
      tagList = tagList.map((i) => i.id);
      tagPosts = await PostTagModel.count({
        group: ["post-tag.postId"],
        where: { tagId: { [Op.or]: tagList } },
        having: sequelize.literal(
          `count("post-tag"."postId") >= ${tagList.length}`
        ),
        raw: true,
      });
      tagPosts = tagPosts.map((i) => i.postId);
    }

    const posts = await PostModel.findAndCountAll({
      offset: offset | 0,
      order: [order || ["createdAt", "ASC"]],
      limit,
      where: { ...values, id: { [Op.or]: tagPosts } },
      subQuery: false,
      attributes: {
        include: [
          [sequelize.literal("COUNT(DISTINCT(comments.id))"), "commentCount"],
        ],
      },
      include: [
        {
          model: UserModel,
          order: [["id", "DESC"]],
          as: "likedBy",
          through: { attributes: [] },
          attributes: ["id"],
        },

        {
          model: ProfileModel,
          as: "author",
          attributes: ["id", "lastName", "firstName", "avatar"],
        },
        {
          model: CommentModel,
          as: "comments",
          attributes: [],
        },
        {
          model: TagModel,
          as: "tags",
          through: { attributes: [] },
        },
      ],
      group: ["post.id", "author.id", "likedBy.id", "tags.id"],
    });
    return posts;
  }

  async likePost(postId, userId) {
    const postLikes = await PostLikeModel.findOne({
      where: { postId, userId },
    });
    if (!postLikes) {
      await PostLikeModel.create({ userId, postId });
    } else {
      await PostLikeModel.destroy({ where: { userId, postId } });
    }
    const likedBy = await PostLikeModel.findAll({
      where: { postId },
      attributes: ["userId"],
    });
    return likedBy;
  }

  async deletePost(id) {
    const post = await PostModel.findOne({
      where: { id },
      include: [
        {
          model: TagModel,
          as: "tags",
        },
      ],
    });
    if (post.selectedFile) removeFile(post.selectedFile);
    post.tags.map(async (tag) => {
      const { count } = await PostTagModel.findAndCountAll({
        where: { postId: id },
      });
      if (count <= 1) {
        await TagModel.destroy({ where: { name: tag.name } });
      }
    });

    await PostTagModel.destroy({ where: { postId: id } });
    const deletedPost = await PostModel.destroy({ where: { id } });
    return deletedPost;
  }

  async getTags(tag) {
    const tags = await TagModel.findAll({
      where: { name: { [Op.substring]: tag } },
      attributes: ["name"],
    });
    return tags.map((el) => el.name);
  }
  async getPostTitles(title) {
    const titles = await PostModel.findAll({
      where: { title: { [Op.contains]: title } },
      attributes: ["title"],
    });
    return titles;
  }
}

module.exports = new PostService();
