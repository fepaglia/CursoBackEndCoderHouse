import { Router } from 'express';
import ProductManager from '../manager/ProductManager.js';

const prodManager = new ProductManager();
const router = Router();

router.get('/', async (req,res)=>{
    try {
        const products = await prodManager.getProducts();

        res.render('realTimeProducts', {products, style: 'realTimeProducts.css' });
    } catch (error) {
        
    }

})

export default router;