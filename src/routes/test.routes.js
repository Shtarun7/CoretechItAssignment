const express = require("express");
const router = express.Router();
const verifyJwt = require("../middleware/auth.middleware");
const { initializeTest } = require("../controllers/test.controller");
router.use(verifyJwt);
router.get("/start", initializeTest);

module.exports = router;
