import express from 'express';
import handlebars from 'express-handlebars';

import sessionsRouter from './routes/api/sessions.router.js'
import productsRouter from './routes/api/products.router.js';
import cartsRouter from './routes/api/carts.router.js';
import viewsRouter from './routes/web/views.router.js';
 
import __dirname from './utils.js';

// import passport from 'passport';
// import initializePassport from './config/passport.config.js';

import './config/dbMongo.Config.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

//Configuracion handlebars:
app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars')

// //Configuracion passport:
// initializePassport();
// app.use(passport.initialize());
// app.use(passport.session());

//
app.use('/api/products', productsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

app.listen(8080, ()=> console.log("3preEntrega"));