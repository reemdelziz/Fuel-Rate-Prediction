import dbconnection from "./dbconnect.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import dotenv from "dotenv";
dotenv.config();

const saltRounds = 10;

export async function createClient(username, password){
    const query = 'INSERT INTO userAuth (username, password) VALUES (?, ?)';
    return new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
                console.error('Hashing error:', err);
                reject(err);
            }
            dbconnection.query(query, [username, hash], (err, result) => {
                if (err) {
                    console.error('Query error:', err); // this is what we want to catch and display to user if there was a duplicate
                    reject(err);
                }
                resolve(result);
            });
        });
    });
}

export async function loginClient(username, password){
    const query = 'SELECT * FROM userAuth WHERE username = ?';
    return new Promise((resolve, reject) => {
        dbconnection.query(query, [username], (err, result) => {
            if(err){
                reject(err);
            }
            if(result.length > 0){
                bcrypt.compare(password, result[0].password, (err, response) => {
                    if(response){
                        const id = result[0].username;
                        const token = jwt.sign({id}, process.env.JWTSECRET, {
                            expiresIn: 300,
                        });
                        const updateRes = {...result[0]};
                        delete updateRes.password;
                        
                        resolve({ auth: true, token: token, result: updateRes });
                    } else{
                        reject({message: "Incorrect username/password combination"});
                    }
                });
            } else{
                reject({message: "User doesn't exist"});
            }
        });
    });
}

export async function updateClientProfile(username, fullname, address1, address2, city, state, zipcode){
    const query = `UPDATE profile SET fullname = ?, address1 = ?, address2 = ?, city = ?, state = ?, zipcode = ? WHERE username = ?`;
    return new Promise((resolve, reject) => {
        dbconnection.query(query, [fullname, address1, address2, city, state, zipcode, username], (err, result) => {
            if(err){
                reject({statusCode: 500, error: "Database failed to update profile", err: err});
            }
            resolve({statusCode: 200, message: "Profile updated successfully", result: result});
        });
    }
    );
}

export async function postClientProfile(fullname, address1, address2, city, state, zipcode, username){
    const query = 'INSERT INTO profile (fullname, address1, address2, city, state, zipcode, username) VALUES (?, ?, ?, ?, ?, ?, ?)';
    const updateUser = 'UPDATE userAuth SET oldUser = ? WHERE username = ?';
    return new Promise((resolve, reject) => {
        dbconnection.query(query, [fullname, address1, address2, city, state, zipcode, username], (err, result) => {
            if(err){
                reject(err);
            }
            dbconnection.query(updateUser, [true, username], (updateErr, updateResult) => {
                if(updateErr){
                    reject(err);
                }
                resolve({message: "Client no longer an older user", updateResult});
            });
            resolve({message: "Client's profile inserted successfully", result});
        });
    });
}

export async function getClientProfile(username) {
    const query = 'SELECT * FROM profile WHERE username=?';
    return new Promise((resolve, reject) => {
        dbconnection.query(query, [username], (err, result) => {
            if (err) {
                reject({ statusCode: 500, error: 'Database get failed' });
            } else if (result.length === 0) {
                reject({ statusCode: 404, error: 'User profile not found' });
            } else {
                const userProfile = result[0];
                resolve({ statusCode: 200, data: userProfile });
            }
        });
    });
}

export async function getPricingModule(state){
    const query = 'SELECT * FROM state WHERE state=?';
    return new Promise((resolve, reject) => {
        dbconnection.query(query, [state], (err, result) => {
            if(err){
                reject({statusCode: 500, error: "Database failed to get pricing module", err});
            } else if (result.length === 0){
                reject({statusCode: 404, error: "Pricing module not found"});
            } else{
                const statePrice = result[0];
                resolve({statusCode: 200, data: statePrice});
            }
        });
    });
}

export async function generateQuote(location, gallons, price_per_gallon, delivery_date, total_price, profit_margin, username){
    const query = `
    INSERT INTO quotes (location, gallons, price_per_gallon, delivery_date, total_price, profit_margin, username)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    return new Promise((resolve, reject) => {
        const values = [location, gallons, price_per_gallon, delivery_date, total_price, profit_margin, username];
        dbconnection.query(query, values, (err, result) => {
            if(err){
                reject({statusCode: 500, error: "Database failed to insert quote", err});
            }
            resolve({statusCode: 200, message: 'Fuel quote inserted successfully', insertId: result.insertId});
        });
    });
}

export async function setPrevClient(prevClient, username){
    const query = 'UPDATE profile SET prevClient = ? WHERE username = ?';
    return new Promise((resolve, reject) => {
        dbconnection.query(query, [prevClient, username], (err, result) => {
            if(err){
                reject({statusCode: 500, error: "Database failed to update preClient", err});
            }
            resolve({statusCode: 200, message: "Successfully updated preClient"});
        })
    })
}

export async function getHistory(username){
    const query = 'SELECT * FROM quotes WHERE username=?';
    return new Promise((resolve, reject) => {
        dbconnection.query(query, [username], (err, result) => {
            if(err){
                reject({statusCode: 500, error: "Database failed to get fuel history", err});
            } else if(result.length === 0){
                reject({statusCode: 500, error: "User not found"});
            } 
            const fuelHistory = result;
            resolve({statusCode: 200, data: fuelHistory});
            
        });
    });
}

export const verifyJWT = (req, res, next) => {
    const token = req.headers["x-access-token"];
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

const database = {
    createClient,
    loginClient,
    postClientProfile,
    getClientProfile,
    getPricingModule,
    generateQuote,
    getHistory,
    setPrevClient,
    updateClientProfile,
    verifyJWT
};

export default database;