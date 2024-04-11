import dbconnection from '../dbconnect.js';
import express from 'express';
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';

const router = express.Router();

router.post('/', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    dbconnection.query(
        "SELECT * FROM userAuth WHERE username = ?;",
        [username],
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

export default router;