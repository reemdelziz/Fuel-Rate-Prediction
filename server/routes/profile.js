
import express from 'express';
import { verifyJWT } from "../verifyJWT.js";
const router = express.Router();

export const profileRouter = (database) => {
    router.post('/', verifyJWT, async (req, res) => {
        const { fullname, address1, address2, city, state, zipcode, username } = req.body;
        try{
            const insertClient = await database.postClientProfile(fullname, address1, address2, city, state, zipcode, username);
            res.status(201).json({message: "CLient profile inserted successfully", insertClient})
        } catch (err){
            console.log('Clent profile insertion failed', err);
            res.status(500).json({error : 'Client profile insertion failed'});
        }
    });

    router.put('/:username', verifyJWT, async (req, res) => {
        //
    });


    return router;

}