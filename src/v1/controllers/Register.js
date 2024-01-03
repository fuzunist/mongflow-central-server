const httpStatus = require("http-status/lib");
const { passwordToHash } = require("../utils/helpers");
const { createUser } = require("../services/User");

const register = async (req, res) => {
  try {
    const { Email, Password, Username, Itin } = req.body;
    if (!Email || !Password || !Username || !Itin) {
      return res.status(httpStatus.BAD_REQUEST).send({
        error: "Invalid input data. Email and Password are required.",
      });
    }

    await createUser({
      Email,
      Username,
      Itin,
      hashedPassword: await passwordToHash(Password),
    })
      .then(({ rows }) => res.status(httpStatus.CREATED).send(rows[0]))
      .catch((e) => {
        if (e.constraint === "unique_username")
          return res
            .status(httpStatus.BAD_REQUEST)
            .send({ error: "Username already exists" });
        if (e.constraint === "unique_email")
          return res
            .status(httpStatus.BAD_REQUEST)
            .send({ error: "Email already exists" });
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send({ error: e });
      });
  } catch (error) {
    console.error(error);
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .send({ error: "Internal server error" });
  }
};

module.exports = register;
