import express from 'express';

import authentication from './authentication';
import renderView from './views';


const router = express.Router();


export default (): express.Router => {
    authentication(router);
    
    renderView(router);

    return router;
}