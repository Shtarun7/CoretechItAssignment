const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_SECRET } = require("../config/server-config");
const User = require("../models/user.model");
const verifyJwt = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken || req.header("Authorization")?.split(" ")?.[1];
    console.log("token", token);
    if (!token) {
      return res.status(401).json({
        message: "Unauthorized request",
        data: null,
        success: "fail",
      });
    }

    const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded?._id).select("-password");
    if (!user) {
      return res.status(401).json({
        message: "Invalid access token",
        data: null,
        success: "fail",
      });
    }

    req.user = user;
    next();
  } catch (e) {
    return res.status(500).json({
      message: "Unknown error",
      data: e.message,
      success: "fail",
    });
  }
};

module.exports = verifyJwt;
