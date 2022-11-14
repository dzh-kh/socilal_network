const {
  CommentModel,
  ProfileModel,
  CommentLikeModel,
  UserModel,
} = require("../models");
const { addFile, removeFile, getValidValues } = require("../utils/functions");
class CommentService {
  async getComments(postId) {
    const comments = await CommentModel.findAll({
      where: { postId },
      attributes: [
        "attachment",
        "createdAt",
        "id",
        "parentId",
        "postId",
        "text",
      ],

      include: [
        {
          model: ProfileModel,
          as: "author",
          attributes: ["firstName", "lastName", "avatar", "id"],
        },
        {
          model: CommentModel,
          as: "addressee",
          attributes: ["id"],
          include: [
            {
              model: ProfileModel,
              as: "author",
              attributes: ["firstName", "lastName"],
            },
          ],
        },
        {
          model: UserModel,
          as: "likedBy",
        },
      ],
    });

    return comments;
  }

  async addComment(profileId, postId, attachment, text, parentId, adresseeId) {
    const values = getValidValues({
      profileId,
      postId,
      attachment,
      text,
      parentId,
      adresseeId,
    });

    let fileName = null;
    if (values.attachment) {
      fileName = await addFile(attachment);
    }
    const comment = await CommentModel.create({
      ...values,
      attachment: fileName,
    });

    const newComment = await CommentModel.findOne({
      where: { id: comment.id },
      include: [
        {
          as: "author",
          where: { id: profileId },
          model: ProfileModel,
          attributes: ["firstName", "lastName", "avatar", "id"],
        },
        {
          as: "author",
          where: { id: profileId },
          model: ProfileModel,
          attributes: ["firstName", "lastName", "avatar", "id"],
        },
        {
          model: UserModel,
          as: "likedBy",
        },
      ],
    });
    return newComment;
  }
  async editComment(postId, id, text, attachment) {
    const prevComment = await CommentModel.findOne({
      where: { id, postId },
    });
    let fileName = null;
    if (typeof attachment === "string") {
      fileName = attachment;
    }
    if (
      attachment &&
      typeof attachment !== "string" &&
      prevComment?.attachment
    ) {
      await removeFile(prevComment?.attachment);
      fileName = await addFile(attachment);
    }

    if (attachment && !prevComment?.attachment) {
      fileName = await addFile(attachment);
    }

    const comment = await CommentModel.update(
      { text, attachment: fileName },
      {
        where: { id, postId },
        returning: true,
        plain: true,
      }
    );
    return comment[1];
  }

  async likeComment(userId, commentId) {
    const commentLikes = await CommentLikeModel.findOne({
      where: { commentId, userId },
    });
    if (!commentLikes) {
      await CommentLikeModel.create({ userId, commentId });
    } else {
      await CommentLikeModel.destroy({ where: { userId, commentId } });
    }
    const likedBy = await CommentLikeModel.findAll({
      where: { commentId },
      attributes: ["userId"],
    });
    return likedBy;
  }

  async deleteComment(postId, id) {
    const comments = await CommentModel.destroy({ where: { id, postId } });
    return comments;
  }
}

module.exports = new CommentService();
