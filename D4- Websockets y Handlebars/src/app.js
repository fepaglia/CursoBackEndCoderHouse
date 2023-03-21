import express from 'express';
import handlebars from 'express-handlebars';
import  __dirname  from './utils.js';
import { Server } from 'socket.io';

import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars' , handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


app.use('/api/products' , productsRouter );
app.use('/realtimeproducts', viewsRouter );


const server = app.listen(8080, ()=> console.log("Server on 8080, D4 Websocket y Handlebars"));

const io = new Server(server)
app.set('socketio', io);