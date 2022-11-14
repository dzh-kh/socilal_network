const { Router } = require("express");
const userController = require("../controllers/user-controller");
const router = new Router();
const authMiddleware = require("../middlewares/auth-middleware");
const validateRequestMiddleware = require("../middlewares/validate-request-middleware");
const {
  registerSchema,
  loginSchema,
} = require("../validate-schemas/user-schema");

router.post(
  "/registration",
  registerSchema,
  validateRequestMiddleware,
  userController.registration
);

router.post(
  "/login",
  loginSchema,
  validateRequestMiddleware,
  userController.login
);

router.get("/refresh", userController.refresh);

router.post("/logout", userController.logout);

router.get("/likes", authMiddleware, userController.getUserLikes);

module.exports = router;
