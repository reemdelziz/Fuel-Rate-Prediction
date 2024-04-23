import express from 'express';
const router = express.Router();


export const fuelRouter = (database) => {
    const verifyJWT = database.verifyJWT;
    router.get('/user/:username', verifyJWT, async (req, res) =>{
        const username = req.params.username;
        try{
            const { statusCode, data, error } = await database.getClientProfile(username);
            res.status(statusCode).json({userProfile: data});
        } catch (err){
            console.error('Query error:', err);
            res.status(err.statusCode || 500).json({ error: err.error || 'Internal Server Error' });
        }
    });

    router.get('/state/:state', verifyJWT, async (req, res) => {
        const state = req.params.state;
        try{
            const {statusCode, data, error} = await database.getPricingModule(state);
            res.status(statusCode).json({stateGasPrice: data || error});
        } catch (err){
            console.error('Query error:', err);
            res.status(err.statusCode || 500).json({ error: err.error || 'Internal Server Error' });
        }
    });

    router.post('/post/quote', verifyJWT, async (req, res) => {
        const { location, gallons, price_per_gallon, delivery_date, total_price, profit_margin, username } = req.body;
        try{
            const {statusCode, error, message, insertId} = await database.generateQuote(location, gallons, price_per_gallon, delivery_date, total_price, profit_margin, username);
            res.status(statusCode).json({message: message, insertId: insertId});
        } catch(err){
            res.status(err.statusCode || 500).json({error: err.err || 'Internal Server Error'});
        }
    });
    router.get('/history/:username', verifyJWT, async (req, res) => {
        const username = req.params.username;
        try{
            const {statusCode, data, error} = await database.getHistory(username);
            res.status(statusCode).json({fuelHistory: data});
        } catch (err){
            res.status(err.statusCode).json({error: err.error});
        }
    });

    return router;

}