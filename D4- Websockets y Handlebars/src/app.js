import express from 'express';
import handlebars from 'express-handlebars';
import  __dirname  from './utils.js';
import { Server } from 'socket.io';

import productsRouter from './routes/products.router.js';
import viewsRouter from './routes/views.router.js';

import ProductManager from './manager/ProductManager.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(`${__dirname}/public`));

app.engine('handlebars' , handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');


app.use('/', productsRouter );
app.use('/realtimeproducts', viewsRouter );


const httpServer = app.listen(8080, ()=> console.log("Server on 8080, D4 Websocket y Handlebars"));

const socketServer = new Server(httpServer);

const productmanager = new ProductManager();

socketServer.on('connection', async socket =>{
    console.log("Conexion establecida desdde el servidor");
    
    socket.on('client:createProduct', async newProd =>{
        console.log("Nuevo producto agregado:", newProd);
        await productmanager.addProduct( newProd.title, newProd.description, newProd.price, newProd.thumbnails, newProd.status, newProd.code, newProd.stock );
        
        const products = await productmanager.getProducts();
        socketServer.emit('server:allProds', products);
   
    })
    
    socket.on('client:deleteProd', async prodID =>{
        const id= Number(prodID);

        await productmanager.deleteProduct(id).then(async ()=>{
        const products = await productmanager.getProducts();
        socketServer.emit('server:allProds', products)});
    })


});