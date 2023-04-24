import express from 'express';

export const renderView =  async (req: express.Request, res: express.Response) => {
    try{
        res.render('home');
    }catch(error){
        res.sendStatus(404);
    }
}