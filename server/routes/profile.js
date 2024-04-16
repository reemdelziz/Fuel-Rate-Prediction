import dbconnection from "../dbconnect.js";
import express from 'express';
import { verifyJWT } from "../verifyJWT.js";
const router = express.Router();

router.post('/', verifyJWT, async (req, res) => {
    const { fullname, address1, address2, city, state, zipcode, username } = req.body;

    const insertQuery = 'INSERT INTO profile (fullname, address1, address2, city, state, zipcode, username) VALUES (?, ?, ?, ?, ?, ?, ?)';
    dbconnection.query(insertQuery, [fullname, address1, address2, city, state, zipcode, username], (err, result) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database insertion failed' });
        }
        const updateQuery = 'UPDATE userAuth SET oldUser = ? WHERE username = ?';
        dbconnection.query(updateQuery, [true, username], (updateErr, updateResult) => {
            if (updateErr) {
                console.error('Update query error:', updateErr);
                return res.status(500).json({ error: 'Failed to update oldUser flag' });
            }

            console.log('Client profile inserted successfully', result);
            res.status(201).json({ message: 'User profile inserted successfully', fullname });
        });
    });
});


export default router;