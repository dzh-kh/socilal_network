const { body } = require("express-validator");

const registerSchema = [
  body("email").isEmail(),
  body("firstName")
    .exists({ checkNull: true })
    .isLength({ min: 2, max: 8 })
    .withMessage("First name must be 2-8 characters long"),

  body("lastName")
    .exists({ checkNull: true })
    .isLength({ min: 2, max: 8 })
    .withMessage("Last name must be 2-8 characters long"),

  body("password")
    .isLength({ min: 6, max: 10 })
    .withMessage("Password must be 6-10 characters long"),
];

const loginSchema = [
  body("email").isEmail(),
  body("password")
    .isLength({ min: 6, max: 10 })
    .withMessage("Password must be 6-10 characters long"),
];

module.exports = { registerSchema, loginSchema };
