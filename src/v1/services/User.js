const loginUser = (email) => {

  return process.pool.query('SELECT * FROM "cas" WHERE email = $1', [email]);
};

const findOne = (userid) => {
    return process.pool.query('SELECT * FROM "cas" WHERE uuid = $1', [userid])
}

const getFullUser= (userid)=>{
  return process.firmDB.query('SELECT * FROM "User" WHERE user_uuid = $1', [userid])
}


module.exports = { loginUser, findOne, getFullUser };
