import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());


//REGISTER
app.post('/register', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    res.json({username, password});
});

//login
app.post('/login', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if(!username || !password){
        res.status(400).json({message: "invalid login"});
        return;
    }
    res.json({username, password});
});

//PROFILE
app.post('/profile', async (req, res) => {
    const fullname = req.body.fullname
    const address1 = req.body.address1;
    const address2 = req.body.address2;
    const city = req.body.city;
    const state = req.body.state;
    const zip = req.body.zip;
    res.json({fullname, address1, address2, city, state, zip})
});

//quote
app.post('/quote', async (req, res) => {
    const gallonsRequested = req.body.gallonsRequested;
    const deliveryAddress = req.body.deliveryAddress;
    const deliveryDate = req.body.deliveryDate;
    res.json({gallonsRequested, deliveryAddress, deliveryDate});
});



export default app
