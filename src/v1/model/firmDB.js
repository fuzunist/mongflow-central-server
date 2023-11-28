const { Pool } = require("pg");
const companyList= require("../constants/company")

 const connectFirmDB= async (itin)=>{
   const itinKey= Object.keys(companyList).find(key=> key===itin.toString());
   const dbName=companyList[itinKey]
   const dbURL= process.env[dbName];

    const pool = new Pool({
        connectionString:dbURL,
        ssl: {
          rejectUnauthorized: false,
        },
      });
    
      console.log(`DB is connected to: ${dbName} `);
    
      process.firmDB = pool;

     

}

module.exports=connectFirmDB