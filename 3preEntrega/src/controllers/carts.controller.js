import {
    getCarts as getCartsServices,
    createCart as createCartServices, 
    getCartById as getCartByIdServices, 
    updateCart as updateCartServices,
    deleteCart as deleteCartServices, 
    emptyCart as emptyCartServices
} from '../services/carts.services.js';
import { getProductsById as getProductsByIdServices} from '../services/products.services.js';
import { createCartUser as createCartUserServices } from '../services/users.services.js';

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

const updateCart =async (req,res) =>{
    const prodId = req.params.pid;
    const cartId = req.params.cid;
    try {
        const cart = await getCartByIdServices(cartId);
        //Importarlo desde el DAO de PRODUCTOS
        const prod = await getProductsByIdServices(prodId);

        cart.products.push({pId: prod._id});
        console.log(cart);

        const update = await updateCartServices(cartId, cart)
        res.send({payload: update})
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

export {
    getCarts,
    createCart,
    getCartById,
    updateCart,
    deleteCart,
    deleteOneProdofCart,
    emptyCart,

};