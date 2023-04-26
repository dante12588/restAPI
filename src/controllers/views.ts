import express from 'express';
const session = require('express-session');

export const home = (req: express.Request, res: express.Response) => {
    try{
        res.render('home');
    }catch(error){
        res.sendStatus(404);
    }
}

export const aboutUs = (req: express.Request, res: express.Response) => {
    try{
        res.render('about-us');
    }catch(error){
        res.send(404);
    }
}

export const adminPanel = (req: express.Request, res: express.Response) => {
    try{
        const login = session.userName;
        const w = 'lubbię placki';

        if(login){
            res.render('admin-panel/home', { login, w });
        }else{
            res.render('admin-panel/login');
        }

    }catch(error){
        res.send(404);
    }
}