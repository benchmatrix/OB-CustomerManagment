
require("dotenv").config(); 
const { connectDB ,pool} = require("../../config/dbConnection");
const checkNull = require('../utlities/validation');
const execute = require('../utlities/databasecomunication');
exports.handler = async (event) => {
    try {

    // console.log("hello");
     const FirstentryJson = JSON.parse(event.body);
     let Title=FirstentryJson.JS;
     let AddS=FirstentryJson.add;
     Title=Title+" Shabbir";
     AddS=AddS+" Juzer";

       const data = [FirstentryJson.JS, FirstentryJson.add];
     const sql = "INSERT INTO Firstentry (title, [add]) VALUES ("+checkNull(Title)+","+checkNull(AddS)+") select SCOPE_IDENTITY()";
     console.log("Executing SQL query:", sql);
      execute(sql,data)  
       console.log("End SQL query:", sql);

    
  } catch (e) {
    console.log("Encountered an error:", e);
    return {
      statusCode: e.statusCode ? e.statusCode : 500,
      body: JSON.stringify({
        error: e.name ? e.name : "Exception",
        message: e.message ? e.message : "Unknown error",
      }),
    };
  }
};


