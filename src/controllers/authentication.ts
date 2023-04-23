import express from 'express';

import { createUser, getUserByEmail } from '../db/users';
import { random, authentications } from '../helpers';

export const register = async (req: express.Request, res: express.Response) => {
    try{
        const {email, password, username} = req.body;

        if(!email || !password || !username){
            return res.sendStatus(400);
        }


        const existiongUser = await getUserByEmail(email);

        if(existiongUser){
            return res.sendStatus(400);
        }

        const salt = random();
        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentications(salt, password),
            },
        });

        return res.status(200).json(user).end();

    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}