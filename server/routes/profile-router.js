const { Router } = require("express");
const profileController = require("../controllers/profile-controller");
const authMiddleware = require("../middlewares/auth-middleware");
const validateRequestMiddleware = require("../middlewares/validate-request-middleware");
const { editProfileSchema } = require("../validate-schemas/profile-schema");

const router = new Router();

router.patch(
  "/:id",
  editProfileSchema,
  validateRequestMiddleware,
  authMiddleware,
  profileController.editProfile
);
router.get("/:id", profileController.getProfile);
router.get("/", profileController.getProfiles);
router.get("/:id/friend", profileController.getFriends);
router.post("/:id/friend", authMiddleware, profileController.addFriend);
router.patch("/:id/friend", authMiddleware, profileController.accessFriendship);
router.delete("/:id/friend", authMiddleware, profileController.removeFriend);

module.exports = router;
