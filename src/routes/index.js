const express = require("express");
const router = express.Router();
const userRouter = require("./user.routes");
const testRouter = require("./test.routes");
const questionRouter = require("./questions.routes");
router.use("/users", userRouter);
router.use("/test", testRouter);
router.use("/questions", questionRouter);

module.exports = router;
