import express from 'express'

import { sendForm } from '../controllers/forms';

export default (router: express.Router) => {
    router.post('/sendForm', sendForm);
}