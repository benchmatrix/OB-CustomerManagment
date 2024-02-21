require("dotenv").config(); 
const { connectDB, pool } =require("../../config/dbConnection");
 const checkNull = require('../utlities/validation');

async function execute(sql, data) {
  try {
    console.log(process.env.APPLICATION_KEY);
    await connectDB(); // Establish database connection
    console.log("Connected to the database");

    // Use pool.request() to execute queries
    const result = await pool.request().query(sql);

    // No need to close the database connection here

    const response = {
      statusCode: 200,
      body: JSON.stringify({ message: "successfully created" }),
    };

    return response;
  } catch (err) {
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
}
module.exports = execute;
async function getDataFromQuery(sqlGet) {
  try {
    await connectDB(); // Establish database connection
    console.log("Connected to the database");

    const results = await new Promise((resolve, reject) => {
      pool.request().query(sqlGet, (err, result) => {
        if (err) {
          console.error('Error executing query:', err);
          return reject(err);
        }
        console.log('Data fetched:', result);
        resolve(result.recordset); // Resolve the promise with the data fetched
        
      });
    });
    console.log(results)
    return results;
    // No need to close the database connection here
   // return result; // Return the data fetched from the query
  } catch (err) {
    console.log("Encountered an error:", err);
    return {
      statusCode: err.statusCode ? err.statusCode : 500,
      body: JSON.stringify({
        error: err.name ? err.name : "Exception",
        message: err.message ? err.message : "Unknown error",
      }),
    };
  }
}
module.exports = getDataFromQuery;
// module.exports ={
//   execute,
//   getDataFromQuery
// };
