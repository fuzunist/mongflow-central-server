const httpStatus = require("http-status/lib");
const {
  generateAccessToken,
  generateRefreshToken,
  passwordHashCompare,
} = require("../utils/helpers");
const { loginUser, getFullUser } = require("../services/User");
const connectFirmDB  = require("../model/firmDB");

const login = async (req, res) => {
  try {
    const { Email, Password } = req.body;
    if (!Email || !Password) {
      return res.status(httpStatus.BAD_REQUEST).send({
        error: "Invalid input data. Email and Password are required.",
      });
    }

    const { rows } = await loginUser(Email);
    if (!rows[0]) {
      return res
        .status(httpStatus.NOT_FOUND)
        .send({ error: "User not found." });
    }
    const hashedPassword = await passwordHashCompare(
      Password,
      rows[0].passwordhash
    );
    console.log("user: ", rows[0]);
    if (hashedPassword) {
      const user = { ...rows[0] };
      delete user.passwordhash;
      user.tokens = {
        access_token: generateAccessToken(user),
        refresh_token: generateRefreshToken(user),
      };

      // Connect Company db
      await connectFirmDB(user.itin);

      const { rows: row } = await getFullUser(user.uuid);
      const fullUserData = row[0];
      delete fullUserData.hashedPassword;
      fullUserData.tokens = {
        access_token: generateAccessToken(fullUserData),
        refresh_token: generateRefreshToken(fullUserData),
      };
      fullUserData.itin=String(user.itin)
      
      console.log("**: ", fullUserData, "fullUserData");
      return res.status(httpStatus.OK).send(fullUserData);
    } else {
      return res
        .status(httpStatus.UNAUTHORIZED)
        .send({ error: "Incorrect password" });
    }
  } catch (error) {
    console.error(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: "Internal server error" });
  }
};

module.exports = login;
