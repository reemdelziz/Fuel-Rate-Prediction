import dotenv from "dotenv";
dotenv.config();
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';

import { registerRouter } from "./routes/register.js";
import { loginRouter } from "./routes/login.js";
import { profileRouter } from "./routes/profile.js";
import { fuelRouter } from "./routes/fuel.js";


export default function(database){
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


    app.use('/login', loginRouter(database));
    app.use('/register', registerRouter(database));
    app.use('/profile', profileRouter(database));
    app.use('/fuel', fuelRouter(database));

    return app;
}