const { Router } = require("express");
const postController = require("../controllers/post-controller");
const commentController = require("../controllers/comment-controller");
const router = new Router();
const authMiddleware = require("../middlewares/auth-middleware");
const validateRequestMiddleware = require("../middlewares/validate-request-middleware");
const {
  createPostSchema,
  createCommentSchema,
} = require("../validate-schemas/post-schema");

router.get("/", postController.getPosts);
router.get("/tag", postController.getTags);
router.get("/title", postController.getPostTitles);

router.post(
  "/",
  createPostSchema,
  validateRequestMiddleware,
  authMiddleware,
  postController.createPost
);

router.post("/like/:id", authMiddleware, postController.likePost);
router.delete("/:id", authMiddleware, postController.deletePost);

router.post(
  "/like/:postId/comment/:commentId",
  authMiddleware,
  commentController.likeComment
);

router.post(
  "/:postId/comment",
  createCommentSchema,
  validateRequestMiddleware,
  authMiddleware,
  commentController.addComment
);
router.get("/:postId/comment", commentController.getComments);
router.delete(
  "/:postId/comment/:commentId",
  authMiddleware,
  commentController.deleteComment
);
router.patch(
  "/:postId/comment/:commentId",
  createCommentSchema,
  validateRequestMiddleware,
  authMiddleware,
  commentController.editComment
);

module.exports = router;
