const express = require("express");
const router = express.Router();

router.use('/signup');
router.use('/login');
router.use('/test');
router.use('/questions');
module.exports = router;