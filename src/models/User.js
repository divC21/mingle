const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = "qwwertyuiop";

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    // minlength: 6,
    maxlength: 20,
    required: true,
  },
  lastName: {
    type: String,
  },
  password: {
    type: String,
    required: true,
    validate(value) {
      const isValidPassword = validator.isStrongPassword(value);
      if (!isValidPassword) throw new Error("Enter a strong password");
    },
  },
  emailId: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate(value) {
      const isValidEmail = validator.isEmail(value);
      if (!isValidEmail) throw new Error("Email is not valid");
    },
  },
  age: {
    type: Number,
    required: true,
    min: 18,
  },
  gender: {
    type: String,
  },
  photoUrl: {
    type: String,
    default: "some avatar url",
  },
  hobbies: {
    type: [String], //array of strings
    lowercase: true,
  },
});

// arrow function will break, as "this" will not work
userSchema.methods.getJWT = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

userSchema.methods.validatePassword = async function (inputPassword) {
  const user = this;
  const isValidPassword = await bcrypt.compare(inputPassword, user.password);
  return isValidPassword;
};
const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
