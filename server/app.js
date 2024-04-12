import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import jwt from "jsonwebtoken";

import loginRouters from "./routes/login.js";
import registerRouter from './routes/register.js';
import profileRouter from './routes/profile.js';
import fuelRouter from './routes/fuel.js';

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


const verifyJWT = (req, res, next) => {
    const token = req.headers["Authorization"];
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


app.use('/login', loginRouters);
app.use('/register', registerRouter);
app.use('/profile', profileRouter);
app.use('/fuel', fuelRouter);

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