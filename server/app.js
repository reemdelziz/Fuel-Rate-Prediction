import express from 'express';
import cors from 'cors';
const app = express();

app.use(express.json());
app.use(cors());


//REGISTER
// app.post('/register', async (req, res) => {
//     const username = req.body.username;
//     const password = req.body.password;
//     res.json({username, password});
// });

//login


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


export default app
