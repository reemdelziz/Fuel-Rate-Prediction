import dbconnection from "../dbconnect.js";
import express from 'express';

const router = express.Router();

router.post('/', async (req, res) => {
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


export default router;