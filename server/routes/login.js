import express from 'express';

const router = express.Router();

export const loginRouter = (database) => {
    router.post('/', async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        try{
            const authResult = await database.loginClient(username, password);
            req.session.user = authResult.result;
            res.status(201).json({ auth: authResult.auth, token: authResult.token, result: authResult.result });
        } catch(error){
            
            res.status(500).json({ message: error }); //sending error to frontend
        }
    });

    return router;
}