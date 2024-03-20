import express from 'express';
const app = express();

app.use(express.json());

//register
app.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    res.json({ message: 'Registration successful' });
})


export default app