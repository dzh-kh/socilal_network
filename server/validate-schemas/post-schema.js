const { body } = require("express-validator");

const createPostSchema = [
  body("title").exists({ checkNull: true }),
  body("message")
    .exists({ checkNull: true })
    .isLength({ min: 2, max: 100 })
    .withMessage("Text must be 2-100 characters long"),
];

const createCommentSchema = [
  body("text")
    .isLength({ min: 2, max: 100 })
    .withMessage("Text must be 2-100 characters long"),
];

module.exports = { createPostSchema, createCommentSchema };
