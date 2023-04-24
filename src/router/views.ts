import express from 'express'

import { renderView } from '../controllers/views'

export default (router: express.Router) => {
    router.get('/', renderView);
}