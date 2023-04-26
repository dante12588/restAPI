import express from 'express';
import { loginAdmin } from '../controllers/loginAdmin';


export default (router: express.Router) => {
    router.post('/admin-login', loginAdmin)
}