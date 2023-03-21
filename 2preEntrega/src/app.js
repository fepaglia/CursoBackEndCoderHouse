import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';

import productsRouter from './routes/api/products.router.js';
import cartsRouter from './routes/api/carts.router.js';
import viewsRouter from './routes/web/views.router.js';
 
import __dirname from './utils.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars')

//
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/', viewsRouter);

try {
    await mongoose.connect('mongodb+srv://admin1:1234@cluster0.qpiwfcg.mongodb.net/?retryWrites=true&w=majority')
} catch (error) {
    console.log(error)
}


app.listen(8080, ()=> console.log("Server On"));