import { Router } from 'express';
import dBCartManager from '../../dao/dbManager/dbCartManager.js';
import dBProductManager from '../../dao/dbManager/dbProductManager.js';

const dbcartmanager = new dBCartManager();
const dbproductmanager = new dBProductManager();
const router = Router();

router.delete('/:cid/products/:pid', async (req,res) =>{
    const prodId = req.params.pid;
    const cartId = req.params.cid;
    try {
        const cart = await dbcartmanager.getCartById(cartId);

        cart.products = cart.products.filter(product => product._id !== prodId);

        await cart.save()
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
    
});

router.put('/:cid/products/:pid', async (req,res) =>{
    
})

router.put('/:cid', async (req,res)=>{
    const id = req.params.cid;
    try {
        const emptyCart = await dbcartmanager.emptyCart(id);
        res.send({result: 'success', payload: emptyCart});
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
})

router.get('/:cid', async (req,res) =>{
    const id = req.params.cid;
    try {
        const cart = await dbcartmanager.getCartById(id);
        res.send({result: 'success', payload: cart});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
})

router.delete('/:cid', async (req, res)=>{
    const cid = req.params.cid;
    try {
        const deleteCart = await dbcartmanager.deleteCart(cid);
        res.send({result: 'success', payload: deleteCart})
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
})

router.get('/', async (req,res)=>{
    try {
        const carts = await dbcartmanager.getCarts();
        res.send({ result: 'success', payload: carts});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
})

router.post('/', async (req,res)=>{
    try {
        const newCart = await dbcartmanager.addCart();
        res.send({result: 'success', payload: newCart});

    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
})

export default router;