import { MONGO_URL } from './config/config';

import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import router from './router/index';
const session = require('express-session');

const oneDay = 1000 * 60 * 60 * 24;

const app = express();

app.use(session({
    secret: "thisismysecrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: false,
    cookie: { maxAge: oneDay }
}));

app.use(cors({
    credentials: true,
}));

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

const server = http.createServer(app);

server.listen(8080, () => {
    console.log("Server running on http://localhost:8080");
})

app.set('views', path.join(__dirname, '/views')); 

app.set('view engine', 'pug');
app.use(express.static( path.join(__dirname, 'public') ));

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
// mongoose.connect(process.env.???);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());

app.use( (req, res, next) => {
    res.status(404).render('404');
})