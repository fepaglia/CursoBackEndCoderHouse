import express from 'express';
import session from 'express-session';
import handlebars from 'express-handlebars';

import MongoStore from 'connect-mongo';

import usersRouter from './routes/api/users.router.js'
import productsRouter from './routes/api/products.router.js';
import cartsRouter from './routes/api/carts.router.js';
import viewsRouter from './routes/web/views.router.js';
 
import __dirname from './utils.js';

import passport from 'passport';
import initializePassport from './config/passport.config.js';

import './dao/dbConfig.js';
import config from './config/config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

//Configuracion sesion:
app.use(session({
    store: MongoStore.create({
        mongoUrl: config.mongoUrl,
        mongoOptions: { useNewUrlParser: true },
        ttl: 3600
       }),
    secret: 'secretCoder',  
    resave: true,
    saveUninitialized: true
}))

//Configuracion handlebars:
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars')

//Configuracion passport:
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

//
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

app.listen(8080, ()=> console.log("3ra Pre Entrega"));