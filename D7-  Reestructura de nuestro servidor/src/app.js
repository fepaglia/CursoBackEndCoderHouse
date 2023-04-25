import express from 'express';
import session from 'express-session';
import handlebars from 'express-handlebars';

import MongoStore from 'connect-mongo';

import sessionsRouter from './routes/api/sessions.router.js'
import productsRouter from './routes/api/products.router.js';
import cartsRouter from './routes/api/carts.router.js';
import viewsRouter from './routes/web/views.router.js';
 
import __dirname from './utils.js';

import passport from 'passport';
import initializePassport from './config/passport.config.js';

import './dao/dbConfig.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

//Configuracion sesion:
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://admin1:1234@cluster0.qpiwfcg.mongodb.net/?retryWrites=true&w=majority',
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
app.use('/api/sessions', sessionsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

app.listen(8080, ()=> console.log("Server On. D7-  Reestructura de nuestro servidor"));