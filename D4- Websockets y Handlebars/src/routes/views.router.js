import { Router } from 'express';
import ProductManager from '../manager/ProductManager.js';

const productmanager = new ProductManager();

const router = Router();

router.get('/', async (req,res)=>{

    res.render('realTimeProducts', { products: productmanager.getProducts() , style: 'realTimeProducts.css' });
})

export default router;