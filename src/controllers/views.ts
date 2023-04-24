import express from 'express';

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