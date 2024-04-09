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

//quote history
const FuelData = [
    {
        quoteId: "0001",
        gallonsRequested: 500,
        deliveryAddress: "123 Elm St, Springiedl",
        deliveryDate: "03-15-2024",
        suggestedPricePerGallon: 2.50,
        totalDue: 1250.00
    },
    {
        quoteId: "0002",
        gallonsRequested: 300,
        deliveryAddress: "456 Oak St, Maplewood",
        deliveryDate: "03-16-2024",
        suggestedPricePerGallon: 2.75,
        totalDue: 825.00
    },
    {
        quoteId: "0003",
        gallonsRequested: 700,
        deliveryAddress: "789 Pine St, Oakville",
        deliveryDate: "03-17-2024",
        suggestedPricePerGallon: 2.45,
        totalDue: 1715.00
    },
    {
        quoteId: "0004",
        gallonsRequested: 400,
        deliveryAddress: "321 Birch St, Riverdale",
        deliveryDate: "03-18-2024",
        suggestedPricePerGallon: 2.60,
        totalDue: 1040.00
    },

    {
        quoteId: "0005",
        gallonsRequested: 600,
        deliveryAddress: "987 Cedar St, Brookside",
        deliveryDate: "03-19-2024",
        suggestedPricePerGallon: 2.55,
        totalDue: 1530.00
    },
    {
        quoteId: "0006",
        gallonsRequested: 400,
        deliveryAddress: "321 Birch St, Riverdale",
        deliveryDate: "03-18-2024",
        suggestedPricePerGallon: 2.60,
        totalDue: 1040.00
    },
    {
        quoteId: "0007",
        gallonsRequested: 400,
        deliveryAddress: "321 Birch St, Riverdale",
        deliveryDate: "03-18-2024",
        suggestedPricePerGallon: 2.60,
        totalDue: 1040.00
    },
    {
        quoteId: "0008",
        gallonsRequested: 400,
        deliveryAddress: "321 Birch St, Riverdale",
        deliveryDate: "03-18-2024",
        suggestedPricePerGallon: 2.60,
        totalDue: 1040.00
    },
    {
        quoteId: "0009",
        gallonsRequested: 400,
        deliveryAddress: "321 Birch St, Riverdale",
        deliveryDate: "03-18-2024",
        suggestedPricePerGallon: 2.60,
        totalDue: 1040.00
    },
    {
        quoteId: "0010",
        gallonsRequested: 400,
        deliveryAddress: "321 Birch St, Riverdale",
        deliveryDate: "03-18-2024",
        suggestedPricePerGallon: 2.60,
        totalDue: 1040.00
    },
    {
        quoteId: "0011",
        gallonsRequested: 400,
        deliveryAddress: "321 Birch St, Riverdale",
        deliveryDate: "03-18-2024",
        suggestedPricePerGallon: 2.60,
        totalDue: 1040.00
    },
    {
        quoteId: "0012",
        gallonsRequested: 400,
        deliveryAddress: "321 Birch St, Riverdale",
        deliveryDate: "03-18-2024",
        suggestedPricePerGallon: 2.60,
        totalDue: 1040.00
    }
];
app.get('/history', async (req, res) => {
    res.json(FuelData);
})


export default app