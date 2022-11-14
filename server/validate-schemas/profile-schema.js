const { body } = require("express-validator");

const editProfileSchema = [
  body("firstName")
    .exists({ checkNull: true })
    .isLength({ min: 2, max: 8 })
    .withMessage("First name must be 2-8 characters long"),

  body("lastName")
    .exists({ checkNull: true })
    .isLength({ min: 2, max: 8 })
    .withMessage("Last name must be 2-8 characters long"),

  body("bio")
    .isLength({ max: 500 })
    .withMessage("Bio must be 0-500 characters long"),
];

module.exports = { editProfileSchema };
