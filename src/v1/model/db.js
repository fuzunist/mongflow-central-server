const { Pool } = require("pg");

const connectDB = async () => {
  const pool = new Pool({
    connectionString: process.env.CAS_DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },

    // user: 'postgres',
    // password: 'postgres',
    // host: 'localhost',
    // port: 5432,
    // database: 'centralauthenticationservice',
    // ssl: false, // Disable SSL explicitly
  });

  console.log("DB Connection is successful...");

  process.pool = pool;
};


const connectMGDB= async () => {
  const pool = new Pool({
    connectionString: process.env.MG_DB_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  console.log("MGDB Connection is successful...");

  process.mgpool = pool;
};

module.exports = {connectDB, connectMGDB};
