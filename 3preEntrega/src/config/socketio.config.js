import { Server } from 'socket.io';
import PRODUCTSDAO from '../dao/index.js';
import server from '../app.js';

const io = new Server(server);

io.on('connection', socket =>{
    console.log("Conexion establecida");
    
    socket.on('product', async (data) =>{
        console.log("Soy data:",data);

        await PRODUCTSDAO.addProduct( data );

        const products = await PRODUCTSDAO.getProducts();

        io.emit('allProds', products);
    })
});

export { io };