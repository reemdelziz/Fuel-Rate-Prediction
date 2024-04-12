import mysql from 'mysql';
import fs from 'node:fs';

const dbconnection = mysql.createConnection({
    host: 'fuelpredictor.mysql.database.azure.com',
    user: 'fuelpredictor',
    password: 'Ilovedevin!',
    database: 'fuelpredictor',
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