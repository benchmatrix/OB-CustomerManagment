require("dotenv").config();
const { connectDB, pool } = require("../../config/dbConnection");
const checkNull = require('../utlities/validation');
const execute = require('../utlities/databasecomunication');

exports.handler = async (event) => {
    try {
        await connectDB(); // Establish database connection

        const FirstentryJson = JSON.parse(event.body);
        let Title = FirstentryJson.JS + " Shabbir";
        let AddS = FirstentryJson.add + " Juzer";

        const data = [Title, AddS];
        const sql = "INSERT INTO Firstentry (title, [add]) VALUES ("+checkNull(Title)+"," +checkNull(AddS)+"); SELECT SCOPE_IDENTITY() AS InsertedId";
        console.log("Executing SQL query:", sql);

        const result = await execute(sql, data);
        //console.log('User inserted:', result.recordset[0].InsertedId);

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "successfully created" }),
        };

    } catch (e) {
        console.log("Encountered an error:", e);
        return {
            statusCode: e.statusCode ? e.statusCode : 500,
            body: JSON.stringify({
                error: e.name ? e.name : "Exception",
                message: e.message ? e.message : "Unknown error",
            }),
        };
    } finally {
        // Close the database connection if necessary
        // await pool.close();
    }
};