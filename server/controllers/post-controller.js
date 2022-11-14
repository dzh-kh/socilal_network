const postService = require("../services/post-service");

class PostController {
  async createPost(req, res, next) {
    try {
      const { title, message, tags } = req.body;
      const userId = req.user.id;
      const selectedFile = req.files?.selectedFile;
      const post = await postService.createPost(
        selectedFile,
        title,
        message,
        tags,
        userId
      );
      res.status(201).json(post);
    } catch (e) {
      next(e);
    }
  }

  async getPosts(req, res, next) {
    const { title, tags, sortBy, userId, offset, limit } = req.query;
    try {
      const posts = await postService.getPosts(
        title,
        tags,
        sortBy,
        userId,
        offset,
        limit
      );
      return res.status(200).json(posts);
    } catch (e) {
      next(e);
    }
  }
  async likePost(req, res, next) {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      const likedBy = await postService.likePost(id, userId);
      res.status(201).json(likedBy);
    } catch (e) {
      next(e);
    }
  }
  async deletePost(req, res, next) {
    try {
      const { id } = req.params;
      const deletedPost = await postService.deletePost(id);
      res.status(200).json(deletedPost);
    } catch (e) {
      next(e);
    }
  }
  async getTags(req, res, next) {
    try {
      const { query } = req.query;
      const tags = await postService.getTags(query);
      res.json(tags);
    } catch (e) {
      next(e);
    }
  }
  async getPostTitles(req, res, next) {
    try {
      const { query } = req.query;
      const titles = await postService.getPostTitles(query);
      res.json(titles);
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new PostController();
