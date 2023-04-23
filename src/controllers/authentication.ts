import express from 'express';

import { createUser, getUserByEmail } from '../db/users';
import { random, authentications } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
    try{
        const { email, password } = req.body;

        if( !email || !password ){
            return res.sendStatus(404);
        }

        const user = await getUserByEmail(email).select('+authentication.salt +authentication.password');


        if(!user){
            return res.sendStatus(400);
        }

        const expectedHash = authentications(user.authentication.salt, password);

        if(user.authentication.password !== expectedHash){
            res.sendStatus(403);
        }

        const salt = random();
        user.authentication.sessionToken = authentications(salt, user._id.toString());

        await user.save();

        res.cookie('MOJE-RESTAPI', user.authentication.sessionToken, { domain: 'localhost', path: '/' });

        res.status(200).json(user).end();
    }catch(error){
        console.log(error);
        return res.sendStatus(400);
    }
}

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