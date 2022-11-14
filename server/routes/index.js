const { Router } = require("express");
const postRouter = require("./post-router");
const userRouter = require("./user-router");
const profileRouter = require("./profile-router");
const messageRouter = require("./message-router");
const router = new Router();

router.use("/post", postRouter);
router.use("/user", userRouter);
router.use("/profile", profileRouter);
router.use("/message", messageRouter);

module.exports = router;
