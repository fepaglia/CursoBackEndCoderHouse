import {
    createCart as addCartServices, 
    getCartById as getCartByIdServices, 
    updateCart as updateCartServices,
    deleteOneProduct as deleteOneProductCartServices, 
    emptyCart as emptyCartServices
} from '../services/carts.services.js';
import { getProductsById as getProductsByIdServices} from '../services/products.services.js';

export const createCart = async (req,res) =>{
    try {
        const newCart = await addCartServices();
        res.send({status: "success", message: "Cart created successfully", newCart});

    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};

 export const getCartById = async (req,res) =>{
    const id = req.params.cid;
    try {
        const cart = await getCartByIdServices(id);
        
        if(!cart){
            return res.status(404).send({ status: "error", message: "Cart not found" });
        }else {
            res.send({status: 'success', cart});
        }
       
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};

export const updateCart =async (req,res) =>{
    const prodId = req.params.pid;
    const cartId = req.params.cid;
    try {
        const cart = await getCartByIdServices(cartId);
        const prod = await getProductsByIdServices(prodId);

        if (!cart || !prod) {
            return res.status(400).send({ status: "error", message: "Invalid id" });
        }

        cart.products.push({pId: prod._id});

        const update = await updateCartServices(cartId, cart)
        res.send({ status: "success", message: "Product added.", update });
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};


export const deleteOneProdofCart = async (req,res) =>{
    
    const prodId = req.params.pid;
    const cartId = req.params.cid;
    try {
       const deleteOne = await deleteOneProductCartServices(cartId, prodId);

       if (!cartId || !prodId) {
            return res.status(400).send({ status: "error", message: "Invalid id" });
        };

       res.send({result: 'success', deleteOne})
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};

export const emptyCart = async (req,res)=>{
    const id = req.params.cid;
    try {
        const emptyCart = await emptyCartServices(id);
        res.send({result: 'success', payload: emptyCart});
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
};