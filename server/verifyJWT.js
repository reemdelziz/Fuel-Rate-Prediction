import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const verifyJWT = (req, res, next) => {
    const token = req.headers["Authorization"];
    if(!token){
        res.send("Token not received");
    } else {
        jwt.verify(token, process.env.JWTSECRET, (err, decoded) => { 
            if(err){
                res.json({auth: false, message: "Failed to authenticate"});
            } else{
                res.user = decoded.id;
                next();
            }
        });
    }
};