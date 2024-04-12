import dbconnection from '../dbconnect.js';
import express from 'express';

const router = express.Router();

router.get('/state/:state', async (req, res) => {
    const state = req.params.state;
    const query = 'SELECT * FROM state WHERE state=?';

    dbconnection.query(query, [state], (err, result) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database get failed' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'User profile not found' });
        }
        console.log(result);
        const stateGasPrice = result[0];
        res.status(200).json({ stateGasPrice });
    });

});

router.get('/user/:username', async (req, res) => {
    const username = req.params.username;
    const query = 'SELECT * FROM profile WHERE username=?';

    dbconnection.query(query, [username], (err, result) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database get failed' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'User profile not found' });
        }
        const userProfile = result[0];
        res.status(200).json({ userProfile });
    });

});


router.post('/post/quote', async (req, res) => {
  
    const { location, gallons, price_per_gallon, delivery_date, total_price, profit_margin, username } = req.body;
    const query = `
        INSERT INTO quotes (location, gallons, price_per_gallon, delivery_date, total_price, profit_margin, username)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [location, gallons, price_per_gallon, delivery_date, total_price, profit_margin, username];
    dbconnection.query(query, values, (err, result) => {
        if (err) {
            console.error('Query error:', err);
            return res.status(500).json({ error: 'Database insertion failed' });
        }
        res.status(201).json({ message: 'Fuel quote inserted successfully', insertId: result.insertId });
    });
});

router.get('/history/:username', async (req, res) => {
    const username = req.params.username;

    const query = 'SELECT  quoteid, location, gallons, price_per_gallon, delivery_date, total_price FROM quotes WHERE username=?';
    dbconnection.query(query, [username], (err, result) => {
        if (err) {
            console.log('Query error:', err);
            return res.status(500).json({ error: 'Database get fuel history failed' });
        }
        if (result.length === 0) {
            return res.status(404).json({ error: 'User not fouond' });
        }
        const fuelHistory = result;
        res.status(200).json({ fuelHistory });
    });
});


export default router;