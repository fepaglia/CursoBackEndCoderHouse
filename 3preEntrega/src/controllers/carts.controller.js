import {
    getCarts as getCartsServices,
    createCart as createCartServices, 
    getCartById as getCartByIdServices, 
    updateCart as updateCartServices,
    deleteCart as deleteCartServices, 
    emptyCart as emptyCartServices
} from '../services/carts.services.js';
import { getProductsById as getProductsByIdServices, updateProduct as updateProductServices} from '../services/products.services.js';
import { createCartUser as createCartUserServices } from '../services/users.services.js';
import UserDto from '../dao/DTOs/users.dto.js';
import logger from '../config/winston.config.js';
import shortid from 'shortid';

import ticketModel from '../dao/MongoDB/models/ticket.model.js';
import { shopOrder as shopOrderMailing } from '../config/nodemailer.config.js';

const getCarts = async (req,res) =>{
    try {
        const carts = await getCartsServices();
        res.send({ result: 'success', payload: carts});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
    
};

const createCart = async (req,res) =>{
    try {
        const newCart = await createCartServices();
        
        const userId = req.user._id;
        console.log(userId)
        
        
        await createCartUserServices(userId, newCart);
        
        res.send({result: 'success', payload: newCart});

    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};

const getCartById = async (req,res) =>{
    const id = req.params.cid;
    try {
        const cart = await getCartByIdServices(id);
        res.send({result: 'success', payload: cart});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};

const updateCart = async (req, res) => {
    const prodId = req.params.pid;
    const cartId = req.params.cid;
    try {
      let cart = await getCartByIdServices(cartId);
      const prod = await getProductsByIdServices(prodId);
  
      let toCart = { pId: prod._id, quantity: 1 }
      
      logger.warning(cart.products);
      
      let existingProductIndex = cart.products.findIndex((item) => item.pId._id.toString() === prodId.toString());
  
      console.log("prueba", cart.products[existingProductIndex]);
  
      logger.info(existingProductIndex);
  
      if (existingProductIndex !== -1) {
        logger.info("igual id");
  
        cart.products[existingProductIndex].quantity += 1;
      } else {
        logger.info("producto nuevo");
        cart.products.push(toCart);
      };
  
      const update = await updateCartServices(cartId, cart);
  
      res.status(200).send({ payload: update });
  
    } catch (error) {
      console.log(error);
      res.status(500).send({ error });
    }
  };

const deleteCart = async (req, res)=>{
    const cid = req.params.cid;
    try {
        const deleteCart = await deleteCartServices(cid);
        res.send({result: 'success', payload: deleteCart})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};

const deleteOneProdofCart = async (req,res) =>{
    
    const prodId = req.params.pid;
    const cartId = req.params.cid;
    try {
        const cart = await getCartByIdServices(cartId);

        cart.products = cart.products.filter(product => product._id !== prodId);

        await cart.save()
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};

const emptyCart = async (req,res)=>{
    const id = req.params.cid;
    try {
        const emptyCart = await emptyCartServices(id);
        res.send({result: 'success', payload: emptyCart});
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};

const purchase = async (req,res) =>{
    
    const cid = req.params.cid;
    const user = req.user;
    const userDto = new UserDto(user.user);
   
    try {
        const cart = await getCartByIdServices(cid);
        
        if (!cart) {
            return res.status(404).send({ error: 'El carrito no existe o no está asociado a un usuario.' });
        }

        //Verificar que el carrito pertenezca al usuario
        if(user.user.carts.find( c => c._id === cid)){
            logger.info("coinciden")
        } else {
            return res.status(404).send({ error: 'El carrito indicado, no está asociado a tu usuario.' });
        }

        // Obtener los productos del carrito
        const products = cart.products;

        // Verificar stock y calcular el monto total
        let totalAmount = 0;

        const productsNotAvailable = [];

        for (const product of products) {
            const { pId, quantity } = product;
            const productData = await getProductsByIdServices(pId);

            if (!productData || productData.stock < quantity) {
                productsNotAvailable.push(pId);
                continue;
            }

            totalAmount += productData.price * quantity;

            // Restar del stock del producto
            productData.stock -= quantity;
            await updateProductServices(pId, productData);
        }

        // Filtrar los productos no disponibles en el carrito
        cart.products = cart.products.filter(product => !productsNotAvailable.includes(product.pId));

        // Crear el ticket
        const ticketData = {
            code: shortid.generate(),
            amount: totalAmount,
            purchaser: user.user.email
        };
        const newTicket = await ticketModel.create(ticketData);

        //Hacemos update del Carrito quedando solo los que no tienen stock, sino se vacia:
        if(productsNotAvailable.length != 0){
            await updateCartServices(cid, productsNotAvailable);
        }else {
            await emptyCartServices(cid);
        }

        logger.info(newTicket);

        await shopOrderMailing(userDto.email, userDto.first_name, ticketData.code, ticketData.amount);

        res.status(201).send({ message: 'Ticket creado exitosamente', ticket: newTicket });

    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
}

export {
    getCarts,
    createCart,
    getCartById,
    updateCart,
    deleteCart,
    deleteOneProdofCart,
    emptyCart,
    purchase

};