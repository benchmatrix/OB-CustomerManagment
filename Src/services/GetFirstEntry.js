require("dotenv").config(); 
const { connectDB ,pool} = require("../../config/dbConnection");
const checkNull = require('../utlities/validation');
const execute = require('../utlities/databasecomunication');
const getDataFromQuery = require("../utlities/databasecomunication");
exports.handler = async (event) => {
    try {
  
     console.log("hello");
     //const FirstentryJson = JSON.parse(event.body);
     const IDS = decodeURIComponent(event.pathParameters.ID);
     console.log(IDS);
    //  let Title=FirstentryJson.JS;
    //  let AddS=FirstentryJson.add;
    //  Title=Title+" Shabbir";
    //  AddS=AddS+" Juzer";
  
      // const data = [FirstentryJson.JS, FirstentryJson.add];
     const sql = "select * from FirstEntry where id="+checkNull(IDS);
     console.log("Executing SQL query:", sql);
     const dta=getDataFromQuery(sql);
     console.log(dta);
     return dta;
  
  
    
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
  