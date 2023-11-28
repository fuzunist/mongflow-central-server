const bcrypt = require("bcrypt");
const JWT = require("jsonwebtoken");
require("dotenv");

const passwordHashCompare = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateAccessToken = (user) => {
  console.log(user, " helper acc");
  console.log("key: ", process.env.ACCESS_TOKEN_SECRET_KEY);
  return JWT.sign(
    { name: user.uuid, ...user },
    process.env.ACCESS_TOKEN_SECRET_KEY,
    { expiresIn: "1w" }
  );
};

const generateRefreshToken = (user) => {
  console.log(user, " helper ref");
  console.log("key: ", process.env.REFRESH_TOKEN_SECRET_KEY);

  return JWT.sign(
    { name: user.uuid, ...user },
    process.env.REFRESH_TOKEN_SECRET_KEY
  );
};

module.exports = {
  passwordHashCompare,
  generateAccessToken,
  generateRefreshToken,
};
