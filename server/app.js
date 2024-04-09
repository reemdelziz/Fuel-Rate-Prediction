import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import fs from 'node:fs';

const app = express();

app.use(express.json());
app.use(cors());

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

//REGISTER
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    const query = 'INSERT INTO userAuth (username, password) VALUES (?, ?)';
    
    dbconnection.query(query, [username, password], (err, result) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database insertion failed' });
        }

        console.log('Client inserted successfully:', result);
        res.status(201).json({ message: 'User registered successfully', username });
    });
});

//login
app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password){
        res.status(400).json({message: "invalid login"});
        return;
    }
    res.json({username, password});
});

//PROFILE
app.post('/profile', async (req, res) => {
    const {fullname, address1, address2, city, state, zipcode, username} = req.body;
    const query = 'INSERT INTO profile (fullname, address1, address2, city, state, zipcode, username) VALUES (?, ?, ?, ?, ?, ?, ?)';
    dbconnection.query(query, [fullname, address1, address2, city, state, zipcode, username], (err, result) => {
        if(err){
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database insertion failed' });
        }
        console.log('Client profile inserted successfully', result);
        res.status(201).json({ message: 'User profile inserted successfully', fullname });
    });
});

//quote
app.post('/quote', async (req, res) => {
    const gallonsRequested = req.body.gallonsRequested;
    const deliveryAddress = req.body.deliveryAddress;
    const deliveryDate = req.body.deliveryDate;
    res.json({gallonsRequested, deliveryAddress, deliveryDate});
});

//quote history
const FuelData = [
    {
        quoteId: "0001",
        gallonsRequested: 500,
        deliveryAddress: "123 Elm St, Springiedl",
        deliveryDate: "03-15-2024",
        suggestedPricePerGallon: 2.50,
        totalDue: 1250.00
    },
    {
        quoteId: "0002",
        gallonsRequested: 300,
        deliveryAddress: "456 Oak St, Maplewood",
        deliveryDate: "03-16-2024",
        suggestedPricePerGallon: 2.75,
        totalDue: 825.00
    },
    {
        quoteId: "0003",
        gallonsRequested: 700,
        deliveryAddress: "789 Pine St, Oakville",
        deliveryDate: "03-17-2024",
        suggestedPricePerGallon: 2.45,
        totalDue: 1715.00
    },
    {
        quoteId: "0004",
        gallonsRequested: 400,
        deliveryAddress: "321 Birch St, Riverdale",
        deliveryDate: "03-18-2024",
        suggestedPricePerGallon: 2.60,
        totalDue: 1040.00
    },

    {
        quoteId: "0005",
        gallonsRequested: 600,
        deliveryAddress: "987 Cedar St, Brookside",
        deliveryDate: "03-19-2024",
        suggestedPricePerGallon: 2.55,
        totalDue: 1530.00
    },
    {
        quoteId: "0006",
        gallonsRequested: 400,
        deliveryAddress: "321 Birch St, Riverdale",
        deliveryDate: "03-18-2024",
        suggestedPricePerGallon: 2.60,
        totalDue: 1040.00
    },
    {
        quoteId: "0007",
        gallonsRequested: 400,
        deliveryAddress: "321 Birch St, Riverdale",
        deliveryDate: "03-18-2024",
        suggestedPricePerGallon: 2.60,
        totalDue: 1040.00
    },
    {
        quoteId: "0008",
        gallonsRequested: 400,
        deliveryAddress: "321 Birch St, Riverdale",
        deliveryDate: "03-18-2024",
        suggestedPricePerGallon: 2.60,
        totalDue: 1040.00
    },
    {
        quoteId: "0009",
        gallonsRequested: 400,
        deliveryAddress: "321 Birch St, Riverdale",
        deliveryDate: "03-18-2024",
        suggestedPricePerGallon: 2.60,
        totalDue: 1040.00
    },
    {
        quoteId: "0010",
        gallonsRequested: 400,
        deliveryAddress: "321 Birch St, Riverdale",
        deliveryDate: "03-18-2024",
        suggestedPricePerGallon: 2.60,
        totalDue: 1040.00
    },
    {
        quoteId: "0011",
        gallonsRequested: 400,
        deliveryAddress: "321 Birch St, Riverdale",
        deliveryDate: "03-18-2024",
        suggestedPricePerGallon: 2.60,
        totalDue: 1040.00
    },
    {
        quoteId: "0012",
        gallonsRequested: 400,
        deliveryAddress: "321 Birch St, Riverdale",
        deliveryDate: "03-18-2024",
        suggestedPricePerGallon: 2.60,
        totalDue: 1040.00
    }
];
app.get('/history', async (req, res) => {
    res.json(FuelData);
})


export default app