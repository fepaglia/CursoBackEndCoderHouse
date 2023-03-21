import { Router } from 'express';

import dBCartManager from '../../dao/dbManager/dbCartManager.js';
import dBProductManager from '../../dao/dbManager/dbProductManager.js';

const dbcartmanager = new dBCartManager();
const dbproductmanager = new dBProductManager();

const router = Router();

router.get('/products', async (req,res)=>{
    try {
        const products = await dbproductmanager.getProducts();
        res.render('products', {products, style: 'products.css'});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

router.get('/cart/:cid', async (req, res) =>{
    const id = req.params.cid;
    try {
        const cart = await dbcartmanager.getCartById(id);
        res.render('carts', {cart, style: 'carts.css'});
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

export default router;