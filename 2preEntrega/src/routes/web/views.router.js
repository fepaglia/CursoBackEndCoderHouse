import { Router } from 'express';

import dBCartManager from '../../dao/dbManager/dbCartManager.js';
import dBProductManager from '../../dao/dbManager/dbProductManager.js';

const dbcartmanager = new dBCartManager();
const dbproductmanager = new dBProductManager();

const router = Router();

router.get('/products', async (req,res)=>{
    try {
        const { limit = 10 } = req.query;
        const { page = 1 } = req.query;
        const sort = req.query.sort;

        const { docs, hasPrevPage, hasNextPage, nextPage, prevPage } = await dbproductmanager.getProducts(limit, page, sort);
        const products = docs;

        res.render('products', {
            products, 
            hasPrevPage, 
            hasNextPage,
            nextPage, 
            prevPage, 
            style: 'products.css'
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

router.get('/products/:pid', async (req,res) =>{
    const prodId = req.params.pid;
    
    try {
        const prodbyid = await dbproductmanager.getProductsById(prodId);

        console.log(prodbyid);

        res.render('productView', { product: prodbyid });
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
})

router.get('/carts/:cid', async (req, res) =>{
    const id = req.params.cid;
    try {
        let cart = await dbcartmanager.getCartById(id);

        res.render('carts', cart);
        
    } catch (error) {
        console.log(error);
        res.status(500).send({ error });
    }
});

export default router;