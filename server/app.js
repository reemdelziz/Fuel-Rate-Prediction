import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());


//register
app.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    res.json({username, password});
});

//login
app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    
});

//profile
/*
app.post('/profile', async (req, res) => {

});
*/


export default app
