const commentService = require("../services/comment-service");
class CommentController {
  async getComments(req, res, next) {
    try {
      const { postId } = req.params;
      const comments = await commentService.getComments(postId);
      res.json(comments);
    } catch (e) {
      next(e);
    }
  }

  async addComment(req, res, next) {
    try {
      const { text, parentId, adresseeId } = req.body;
      const attachment = req.files?.attachment;
      const profileId = req.user.id;
      const { postId } = req.params;
      const comment = await commentService.addComment(
        profileId,
        postId,

        attachment,
        text,
        parentId,
        adresseeId
      );
      res.json(comment);
    } catch (e) {
      next(e);
    }
  }
  async editComment(req, res, next) {
    try {
      const { commentId, postId } = req.params;
      const { text } = req.body;
      const attachment = req.files?.attachment
        ? req.files?.attachment
        : req.body?.attachment !== "null"
        ? req.body?.attachment
        : null;
      const comment = await commentService.editComment(
        postId,
        commentId,
        text,
        attachment
      );
      res.json(comment);
    } catch (e) {
      next(e);
    }
  }
  async likeComment(req, res, next) {
    try {
      const { commentId } = req.params;
      const userId = req.user.id;
      const comment = await commentService.likeComment(userId, commentId);
      res.json(comment);
    } catch (e) {
      next(e);
    }
  }
  async deleteComment(req, res, next) {
    try {
      const { commentId, postId } = req.params;

      const comment = await commentService.deleteComment(postId, commentId);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new CommentController();
