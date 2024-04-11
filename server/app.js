import express, { response } from 'express';
import cors from 'cors';
import mysql from 'mysql';
import fs from 'node:fs';

import bcrypt from 'bcrypt';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import jwt from "jsonwebtoken";

const app = express();

app.use(express.json());
app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "userId",
    secret: "secret", //use .env
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires: 60 * 60 * 1,
    },
}))
const saltRounds = 10;

const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
    if(!token){
        res.send("Token not received");
    } else {
        jwt.verify(token, "jwtSecert", (err, decoded) => { //use .env for secreet 
            if(err){
                res.json({auth: false, message: "Failed to authenticate"});
            } else{
                res.user = decoded.id;
                next();
            }
        });
    }
};

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
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if(err){
            console.log(err)
        }

        dbconnection.query(query, [username, hash], (err, result) => {
            if (err) {
                console.error('Query error:', err);
                return res.status(500).json({ error: 'Database insertion failed' });
            }
            console.log('Client inserted successfully:', result);
            res.status(201).json({ message: 'User registered successfully', username });
        });
    })
    
});

//login
app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    dbconnection.query(
        "SELECT * FROM userAuth WHERE username = ?;",
        username,
        (err, result) => {
            if(err){
                res.send({err: err});
            } if(result.length > 0){
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if(response){ 
                        const id = result[0].username;
                        const token = jwt.sign({id}, "jwtSecret", {
                            expiresIn: 300,
                        }) //create .env variable for jwtSecret
                        req.session.user = result;
                        res.json({auth: true, token: token, result: result}); //make sure we dont send the password
                    } else {
                        res.send({message: "Incorrect username/password combination"})
                    }
                })
            } else {
                res.send({message: "User doesn't exist"})
            }
        }
    );
});

app.get("/isOldUser", async (req, res) => {
    const username = req.body.username;
    if(!username){
        return res.status(400).json({ error: 'Username is required' });
    }
    const query = "SELECT * FROM userAuth WHERE oldUser = FALSE AND username = ?";
    dbconnection.query(query, [username], (err, result) => {
        if (err) {
            console.log('Query error:', err);
            return res.status(500).json({ error: 'Database select failed' });
        }
        console.log('Returned user status successfully', result);
        res.status(200).json({ message: 'Returned user status successfully' });
    });
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

app.get('/history', async (req, res) => {
    
})


export default app