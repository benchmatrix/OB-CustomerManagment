require("dotenv").config(); 
const { connectDB ,pool} = require("../../config/dbConnection");
const checkNull = require('../utlities/validation');


const getDataFromQuery = require('../utlities/databasecomunication');
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
     const data =await getDataFromQuery(sql);
     console.log(data);
     console.log(data.length);
     console.log(data[0].Id);
     console.log(data[0].Title);
     return {
      statusCode: 200,
      body: JSON.stringify(data),
  };
    // return data;
     //result.recordset[0].InsertedId
    
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
  