const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  HASH_ROUNDS,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRY,
} = require("../config/server-config");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "username cannot be empty"],
      unique: [true, "username already in use"],
      lowercase: true,
      index: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "username cannot be empty"],
      unique: [true, "username already in use"],
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: [true, "password cannot be empty"],
    },
  },
  {
    timestamps: true,
  }
);

//TO HASH THE PASSWORD

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    console.log("hashing password");
    this.password = bcrypt.hash(this.password, HASH_ROUNDS);
  }
  next();
});

userSchema.methods.checkPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    ACCESS_TOKEN_SECRET,
    { expiresIn: ACCESS_TOKEN_EXPIRY }
  );
};
const User = mongoose.model("User", userSchema);
module.exports=User;