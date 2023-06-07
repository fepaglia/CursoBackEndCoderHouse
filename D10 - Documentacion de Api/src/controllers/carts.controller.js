import {
    getCarts as getCartsServices,
    addCart as addCartServices, 
    getCartById as getCartByIdServices, 
    updateCart as updateCartServices,
    deleteCart as deleteCartServices, 
    emptyCart as emptyCartServices
} from '../services/carts.services.js';
import { getProductsById as getProductsByIdServices} from '../services/products.services.js';

import logger from '../config/winston.config.js';


const getCarts = async (req,res) =>{
    try {
        const carts = await getCartsServices();
        res.status(200).send({ result: 'success', payload: carts});
        
    } catch (error) {
        logger.error(error);
        res.status(500).send({ error });
    }
    
};

const addCart = async (req,res) =>{
    try {
        const newCart = await addCartServices();
        res.status(200).send({result: 'success', payload: newCart});

    } catch (error) {
        logger.error(error);
        res.status(500).send({ error });
    }
};

const getCartById = async (req,res) =>{
    const id = req.params.cid;
    try {
        const cart = await getCartByIdServices(id);

        if(!cart) return res.status(404).send({status:"error",error:"Cart not found"})

        res.status(200).send({result: 'success', payload: cart});
        
    } catch (error) {
        logger.error(error);
        res.status(500).send({ error });
    }
};

const updateCart =async (req,res) =>{
    const prodId = req.params.pid;
    const cartId = req.params.cid;
    try {
        const cart = await getCartByIdServices(cartId);
        if(!cart) return res.status(404).send({status:"error",error:"Cart not found"})
        //Importarlo desde el DAO de PRODUCTOS
        const prod = await getProductsByIdServices(prodId);
        if(!prod) return res.status(404).send({status:"error",error:"Product not found"})

        cart.products.push({pId: prod._id});
        console.log(cart);

        const update = await updateCartServices(cartId, cart)
        res.status(200).send({payload: update})
    } catch (error) {
        logger.error(error);
        res.status(500).send({ error });
    }
};

const deleteCart = async (req, res)=>{
    const cid = req.params.cid;
    try {
        const deleteCart = await deleteCartServices(cid);
        if(!deleteCart) return res.status(404).send({status:"error",error:"Cart not found"})
        res.status(200).send({result: 'success', payload: deleteCart})
        
    } catch (error) {
        logger.error(error);
        res.status(500).send({ error });
    }
};

const deleteOneProdofCart = async (req,res) =>{
    
    const prodId = req.params.pid;
    const cartId = req.params.cid;
    try {
        const cart = await getCartByIdServices(cartId);
        if(!cart) return res.status(404).send({status:"error",error:"Cart not found"})

        cart.products = cart.products.filter(product => product._id !== prodId);

        const updateCart = await cart.save()
        
        res.status(200).send({result: 'success', payload: updateCart})
        
    } catch (error) {
        logger.error(error);
        res.status(500).send({ error });
    }
};

const emptyCart = async (req,res)=>{
    const id = req.params.cid;
    try {
        const emptyCart = await emptyCartServices(id);
        if(!emptyCart) return res.status(404).send({status:"error",error:"Cart not found"})

        res.status(200).send({result: 'success', payload: emptyCart});
    } catch (error) {
        logger.error(error);
        res.status(500).send({ error });
    }
};

export {
    getCarts,
    addCart,
    getCartById,
    updateCart,
    deleteCart,
    deleteOneProdofCart,
    emptyCart,

};