import express from 'express'

import { aboutUs, home } from '../controllers/views'

export default (router: express.Router) => {
    router.get('/', home);
    router.get('/o-nas', aboutUs);
}