const express = require("express");
const router = express.Router();
const verifyJwt = require("../middleware/auth.middleware");
const {
  getQuestions,
  createQuestion,
} = require("../controllers/question.controller");
router.use(verifyJwt);

router.route("/").get(getQuestions).post(createQuestion);

module.exports = router;
