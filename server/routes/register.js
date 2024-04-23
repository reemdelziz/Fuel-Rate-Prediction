
import express from 'express';
const router = express.Router();

export const registerRouter = (database) => {
    router.post('/', async (req, res) => {
        const {username, password} = req.body;
        try{
            await database.createClient(username, password);
            res.status(201).json({ message: 'User registered successfully', username: username, password: password });
        } catch (error){
            console.error('User registration failed:', error);
            res.status(500).json({ error: error.code });
        }
    });

    return router;
};