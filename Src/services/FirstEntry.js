
require("dotenv").config(); 
const { connectDB ,pool} = require("../../config/dbConnection");

exports.handler = async (event) => {
  try {
    console.log("hello");
    const FirstentryJson = JSON.parse(event.body);
    console.log(process.env.APPLICATION_KEY);
    await connectDB(); // Establish database connection
    console.log("Connected to the database");

    console.log("hello1");
    const result = await new Promise((resolve, reject) => {
      console.log("hello2");
    //  var sql = ";
      console.log("Executing SQL query:", sql);
     // connection.query('SELECT * FROM health_records where id = ?', [data.id], (err, rows) => {
        if(err) throw err;
        response.json({data:rows});
      pool.request().query("INSERT INTO Firstentry (title,[Add]) VALUES (?,?)",[Firstentry.JS],[Firstentry.add], function (err, result) { // Use pool.request() to execute queries
        if (err) {
          console.error("SQL query execution error:", err);
          return reject(err);
        }
        console.log("SQL query executed successfully");
        resolve(result);
      });

      
    });

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
};
