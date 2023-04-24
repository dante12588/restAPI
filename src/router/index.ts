import express from 'express';

import authentication from './authentication';
import renderView from './views';
import forms from './forms';

const router = express.Router();


export default (): express.Router => {
    authentication(router);
    forms(router);
    renderView(router);

    return router;
}