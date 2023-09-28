const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign(id, "secret", {
    expiresIn: "1d",
  });
};

const decodeToken = (token) => {
  return jwt.verify(token, "secret");
};

module.exports = { generateToken, decodeToken };
