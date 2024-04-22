const User = require("../models/user.model");

const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({
        message: "all fields are required",
        data: null,
        success: "fail",
      });
    }

    const userExists = await User.findOne({ username: username, email: email });
    console.log("user exists", userExists);
    if (userExists) {
      return res.status(409).json({
        message: "User already exists",
        data: null,
        success: "fail",
      });
    }

    const createdUser = await User.create({
      username: username,
      email: email,
      password: password,
    });

    const userCreated = await User.findById(createdUser._id).select(
      "-password"
    );

    if (!userCreated) {
      return res
        .status(500)
        .json({ message: "Something went wrong", data: null, success: "fail" });
    }

    return res.status(201).json({
      message: "User created",
      data: userCreated,
      success: "true",
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
      data: null,
      success: "fail",
    });
  }
};

const userLogin = async (req, res) => {
  try {
    //GET THE USERNAME OR email or password
    const { username, email, password } = req.body;
    if (!username && !email) {
      return res.status(400).json({
        message: "username or email required",
        data: null,
        success: "fail",
      });
    }
    if (!password) {
      return res.status(400).json({
        message: "password required",
        data: null,
        success: "fail",
      });
    }

    const user = await User.findOne({
      $or: [{ username: username }, { email: email }],
    });

    // console.log("user", user);
    if (!user) {
      return res.status(404).json({
        message: "User does not exists",
        data: null,
        success: "fail",
      });
    }
    //IF USER EXISTS THE CREATE THE TOKEN AND SEND IT
    const isPasswordCorrect = await user.checkPassword(password);
    if (!isPasswordCorrect) {
      return res.status(500).json({
        message: "Incorrect password",
        data: null,
        success: "fail",
      });
    }

    const accessToken = await user.generateAccessToken();

    const loggedInUser = await User.findById(user._id).select("-password");

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res.status(200).cookie("accessToken", accessToken, options).json({
      message: "User logged in",
      data: { loggedInUser, accessToken },
      success: "true",
    });
  } catch (e) {
    return res.status(500).json({
      message: e.message,
      data: null,
      success: "fail",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    console.log("logout");
  } catch (e) {}
};

module.exports = { registerUser, userLogin, logoutUser };
