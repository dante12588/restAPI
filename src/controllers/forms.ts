import express from 'express';

export const sendForm = (req: express.Request, res: express.Response) => {
    res.send(200);
    console.log(req.body.name);
   
}