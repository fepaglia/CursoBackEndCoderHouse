import express from 'express';
import session from 'express-session';
import handlebars from 'express-handlebars';

import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';

import sessionsRouter from './routes/api/sessions.router.js'
import productsRouter from './routes/api/products.router.js';
import cartsRouter from './routes/api/carts.router.js';
import viewsRouter from './routes/web/views.router.js';
 
import __dirname from './utils.js';

const app = express();

try {
    await mongoose.connect('mongodb+srv://admin1:1234@cluster0.qpiwfcg.mongodb.net/?retryWrites=true&w=majority')
} catch (error) {
    console.log(error)
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://admin1:1234@cluster0.qpiwfcg.mongodb.net/?retryWrites=true&w=majority',
        mongoOptions: { useNewUrlParser: true },
        ttl: 120 //Se le puede pasar el tiempo de expiracion, en segundos en este caso (30segs)
       }),
    secret: 'secretCoder',  
    resave: true,
    saveUninitialized: true
}))


app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars')

//
app.use('/api/products', productsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);



app.listen(8080, ()=> console.log("Server On"));