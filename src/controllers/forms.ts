import { getUserByEmail } from '../db/users';
import express from 'express';

export const sendForm = async (req: express.Request, res: express.Response) => {
    try{
        const { email } = req.body;
    
    const user = await getUserByEmail(email);

    if(!user){
        return res.sendStatus(403);
    }

        console.log(user);
        return res.send(200);
    }catch(error){
        return res.sendStatus(400);
    }
   
}