import express from 'express';
import handlebars from 'express-handlebars';

import usersRouter from './routes/api/users.router.js'
import productsRouter from './routes/api/products.router.js';
import cartsRouter from './routes/api/carts.router.js';
import viewsRouter from './routes/web/views.router.js';
 
import __dirname from './utils.js';

import passport from 'passport';
import initializePassport from './config/passport.config.js';

import './dao/dbConfig.js';
import sessionExpress from './config/session.config.js';

const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

//Session:
sessionExpress(app);

//Handlebars:
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars')

//Passport:
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//Routers
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

export const server = app.listen(8080, ()=> console.log("3ra Pre Entrega"));