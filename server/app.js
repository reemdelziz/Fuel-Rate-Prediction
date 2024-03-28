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

//profile
/*
app.post('/profile', async (req, res) => {

});
*/
//quote

app.post('/quote', async (req, res) => {
    const gallonsRequested = req.body.gallonsRequested;
    const deliveryAddress = req.body.deliveryAddress;
    const deliveryDate = req.body.deliveryDate;
    res.json({gallonsRequested, deliveryAddress, deliveryDate});
});


export default app
