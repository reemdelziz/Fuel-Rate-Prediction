import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

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
    secret: process.env.SECRET, //use .env
    resave: false,
    saveUninitialized: false,
    cookie:{
        expires: 60 * 60 * 1,
    },
}))


app.use('/login', loginRouters);
app.use('/register', registerRouter);
app.use('/profile', profileRouter);
app.use('/fuel', fuelRouter);

export default app