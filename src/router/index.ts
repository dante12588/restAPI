import express from 'express';

import authentication from './authentication';
import renderView from './views';
import forms from './forms';
import adminPanel from './adminPanel';

const router = express.Router();


export default (): express.Router => {
    authentication(router);
    forms(router);
    renderView(router);

    adminPanel(router);


    return router;
}