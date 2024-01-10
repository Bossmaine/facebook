const jwt = require("jsonwebtoken");

exports.generateToken = (value, expiration) => {
  return jwt.sign(value, process.env.JWT_SECRET, { expiresIn: expiration });
};
