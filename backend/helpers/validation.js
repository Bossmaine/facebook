const User = require("../Models/User");

exports.validateEmail = (email) => {
  return String(email)
    .toLocaleLowerCase()
    .match(/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,12})?$/);
};

exports.validateLength = (value, min, max) => {
  if (value.length < min || value.length > max) {
    return false;
  }
  return true;
};

exports.validateUsername = async (username) => {
  let isUser = false;
  do {
    let checkUserName = await User.findOne({ username });
    if (checkUserName) {
      username += Math.floor(Math.random() * 100000) + 1;
      isUser = true;
    } else {
      isUser = false;
    }
  } while (isUser);
  return username;
};
