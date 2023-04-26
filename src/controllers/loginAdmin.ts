import express from 'express';
import { getUserByEmail } from '../db/users';
import { print, authentications } from '../helpers';
const session = require('express-session');


export const loginAdmin = async (req: express.Request, res: express.Response) => {

    try{

        const { login, passwd } = req.body;

        if( !login || !passwd ){
            // jeśi uytkownik nie podał jednego z pól
            print('nie podana jednego z pól');
            return res.redirect('/admin');
        }

        const user = await getUserByEmail(login).select('+authentication.salt +authentication.password');

        if(!user){
            print('Nie ma takiego uytkownika');
            return res.redirect('/admin');
        }

        const expectedHash = authentications(user.authentication.salt, passwd);

        if(user.authentication.password !== expectedHash){
            print('Błędne hasło');
            return res.redirect('/admin');
        }

        print('Zalogowano!!!');
        session.userName = user.username;

        print(session);
        return res.redirect('/admin');

    }catch(error){
        console.log(error);
        return res.redirect('/admin');
    }
}