const loginUser = (email) => {
  return process.pool.query('SELECT * FROM "cas" WHERE email = $1', [email]);
};

const findOne = (userid) => {
  return process.pool.query('SELECT * FROM "cas" WHERE uuid = $1', [userid]);
};

const getFullUser = (userid) => {
  return process.firmDB.query('SELECT * FROM "User" WHERE user_uuid = $1', [
    userid,
  ]);
};

const createUser = async (data) => {
  const { Email, Username, hashedPassword, Itin } = data;

  // If the user doesn't exist, create a new user
  const newUserQuery = `
    INSERT INTO "cas" (email, passwordash, itin)
    VALUES ($1, $2, $3)
    RETURNING *`;

  const newUser = await process.pool.query(newUserQuery, [
    Email,
    hashedPassword,
    Itin,
  ]);

  return newUser.rows[0];
};

module.exports = { loginUser, findOne, getFullUser, createUser };
