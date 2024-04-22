const express = require("express");
const router = express.Router();
const verifyJwt = require("../middleware/auth.middleware");
const {
  registerUser,
  userLogin,
  logoutUser,
} = require("../controllers/user.controller");
router.get("/test", (req, res) => {
  res.send("Workings");
});
router.post("/register", registerUser);
router.post("/login", userLogin);
router.use(verifyJwt);
router.get("/logout", logoutUser);

module.exports = router;
