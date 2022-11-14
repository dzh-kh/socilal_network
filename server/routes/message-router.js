const { Router } = require("express");
const messageController = require("../controllers/message-controller");
const authMiddleware = require("../middlewares/auth-middleware");

const router = new Router();

router.get("/:id", authMiddleware, messageController.getChatMessages);

router.post("/:id", authMiddleware, messageController.addMessage);

router.patch(
  "/:id/chat",
  authMiddleware,
  messageController.updateChatCheckedTime
);

router.get("/", authMiddleware, messageController.getChatRooms);

module.exports = router;
