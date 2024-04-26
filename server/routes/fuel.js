import express from 'express';
const router = express.Router();


export const fuelRouter = (database) => {
    const verifyJWT = database.verifyJWT;
    router.get('/user/:username', verifyJWT, async (req, res) =>{
        const username = req.params.username;
        try{
            const data = await database.getClientProfile(username);
            res.status(201).json({userProfile: data});
        } catch (err){
            console.error('Query error:', err);
            res.status(err.statusCode || 500).json({ error: err.error || 'Internal Server Error' });
        }
    });

    router.get('/state/:state', verifyJWT, async (req, res) => {
        const state = req.params.state;
        try{
            const data = await database.getPricingModule(state);
            res.status(201).json({stateGasPrice: data, state: state});
        } catch (err){
            console.error('Query error:', err);
            res.status(err.statusCode || 500).json({ error: err.error || 'Internal Server Error' });
        }
    });

    router.post('/post/quote', verifyJWT, async (req, res) => {
        const { location, gallons, price_per_gallon, delivery_date, total_price, profit_margin, username } = req.body;
        try{
            const data = await database.generateQuote(location, gallons, price_per_gallon, delivery_date, total_price, profit_margin, username);
            res.status(201).json({data: data, userQuote:{
                location: location,
                gallons: gallons,
                price_per_gallon: price_per_gallon,
                delivery_date: delivery_date,
                total_price: total_price,
                profit_margin: profit_margin
            }});
        } catch(err){
            res.status(err.statusCode || 500).json({error: err.err || 'Internal Server Error'});
        }
    });

    router.put(`/put/client`, verifyJWT, async (req, res) => {
        const {prevClient, username} = req.body;
        try{
            const data = await database.setPrevClient(prevClient, username);
            res.status(201).json({data: data, clientUpdate: {prevClient, username}});
        } catch (error){
            res.status(500 || error.statusCode).json({error: error.error, message: error.message})
        }
    });
    router.get('/history/:username', verifyJWT, async (req, res) => {
        const username = req.params.username;
        try{
            const data = await database.getHistory(username);
            res.status(200).json({fuelHistory: data, username: username});
        } catch (err){
            res.status(err.statusCode).json({error: err.error});
        }
    });

    return router;

}