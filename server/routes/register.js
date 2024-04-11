import dbconnection from "../dbconnect.js";
import bcrypt from 'bcrypt';
import express from 'express';

const router = express.Router();
const saltRounds = 10;

router.post('/', async (req, res) => {
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
            //console.log('Client inserted successfully:', result);
            res.status(201).json({ message: 'User registered successfully', username });
        });
    })
});

router.get('/:username', async (req, res) => {
    const {username} = req.body.username;
    if(!username){
        return res.status(400).json({error: 'Username was not provided'});
    }
    const query = 'SELECT * FROM profile WHERE username = ?';
    dbconnection.query(query, [username], (err, result) => {
        if(err){
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database get failed' });
        }
        console.log('Received client profile info successfully', result);
        res.status(201).json({ message: 'Client profile received successfully'});
    });
});

export default router;