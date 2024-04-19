import mysql from 'mysql';
import fs from 'node:fs';
import dotenv from "dotenv";
dotenv.config();


const dbconnection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    ssl: {
        ca: fs.readFileSync(
            "./helpers/Certificate/DigiCertGlobalRootCA.crt_3.pem",
        )
    },
    multipleStatements: true,
});

dbconnection.connect(err => {
    if(err){
        console.log("Connection error: " + err);
        return
    }
    console.log("Connected to the MySQL server.");
});

export default dbconnection;