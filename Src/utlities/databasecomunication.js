require("dotenv").config(); 
const { connectDB ,pool} = require("../../config/dbConnection");
const checkNull = require('../utlities/validation');
async function execute(sql, data) {
    try {
      console.log(process.env.APPLICATION_KEY);
      await connectDB(); // Establish database connection
      console.log("Connected to the database");
  
      // Use pool.request() to execute queries
      const result = await pool.request().query(sql);
  
      // Close the database connection
      console.log("21");
      await pool.close();
      console.log("1");
      const response = {
        statusCode: 200,
        body: JSON.stringify({ message: "successfully created" }),
      };
      console.log("2");
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
async function getDataFromQuery(sql)
{
    try {
        await connectDB(); // Establish database connection
        console.log("Connected to the database");
        const result = await new Promise((resolve, reject) => {
          console.log("hello2");
            pool.request().query(sql,(err, result
              ) => {
              if (err) {
                console.error('Error executing query:', err);
                return reject(err);
              }
      console.log('Data fetched:', result);
              if(result!=null)

              return result;
            });
        })
        const response = {
          statusCode: 200,
          body: JSON.stringify({ message: "successfully created" }),
        };
        return response;
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
module.exports = execute;
module.exports=getDataFromQuery