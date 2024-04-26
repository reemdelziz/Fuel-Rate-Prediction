import express from 'express';
const router = express.Router();

export const profileRouter = (database) => {
    const verifyJWT = database.verifyJWT;
    router.post('/', verifyJWT, async (req, res) => {
        const { fullname, address1, address2, city, state, zipcode, username } = req.body;
        try{
            const insertClient = await database.postClientProfile(fullname, address1, address2, city, state, zipcode, username);
            res.status(201).json({message: "CLient profile inserted successfully", data: insertClient, userProfile:{
                fullname: fullname, 
                address1: address1,
                address2: address2,
                city: city,
                state: state,
                zipcode: zipcode
            }});
        } catch (err){
            console.log('Client profile insertion failed', err);
            res.status(500).json({error : 'Client profile insertion failed'});
        }
    });
    
    router.put('/update', verifyJWT, async (req, res) => {
        const { fullname, address1, address2, city, state, zipcode, username } = req.body;
        try{
            const updateProfile = await database.updateClientProfile(username, fullname, address1, address2, city, state, zipcode);
            res.status(201).json({messgae: "Updated successfully", data: updateProfile});
        } catch(error){
            console.log('Client profile updated failed', error);
            res.status(500).json({error : 'Client profile update failed'});
        }
    }) 
    

    return router;

}