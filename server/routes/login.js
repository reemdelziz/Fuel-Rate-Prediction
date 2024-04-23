import express from 'express';

const router = express.Router();

export const loginRouter = (database) => {
    router.post('/', async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;
        if (!username || !password) {
            return res.status(400).json({ error: 'Username and password are required' });
        }
        try{
            const authResult = await database.loginClient(username, password);
            if (req.session.user) {
                console.log("made it here")
                req.session.user = authResult.result;
            }
            //req.session.user = authResult.result;
            res.status(201).json({username: username, password: password, authResult: authResult});
        } catch(error){
            res.status(500).json({ message: error.message }); //sending error to frontend
        }
    });

    return router;
}